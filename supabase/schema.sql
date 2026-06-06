-- ============================================================
--  Antojo Nocturno — esquema de base de datos (Supabase / PostgreSQL)
--  Cómo usarlo: en tu panel de Supabase entra a "SQL Editor",
--  pega TODO este contenido y pulsa "Run". Crea las 3 tablas.
-- ============================================================

-- 1) CLIENTES: se identifican por teléfono (sin login).
create table if not exists public.clientes (
  id             uuid primary key default gen_random_uuid(),
  telefono       text unique not null,
  nombre         text,
  email          text,
  acepta_ofertas boolean not null default false,  -- casilla de consentimiento
  creado_en      timestamptz not null default now()
);

-- 2) PEDIDOS: cada compra, asociada a un cliente.
create table if not exists public.pedidos (
  id              uuid primary key default gen_random_uuid(),
  cliente_id      uuid references public.clientes(id) on delete set null,
  items           jsonb not null,          -- [{ id, nombre, precio, cantidad }]
  subtotal        integer not null,        -- en pesos (CLP)
  descuento       integer not null default 0,
  total           integer not null,
  cupon_aplicado  text,                    -- código usado, si hubo
  direccion       text,
  estado          text not null default 'pendiente'
                  check (estado in ('pendiente','pagado','preparando','entregado','cancelado')),
  mp_payment_id   text,                    -- id del pago en Mercado Pago
  -- número de compra de ESE cliente (1, 2, 3...) para la fidelización:
  numero_compra   integer,
  creado_en       timestamptz not null default now()
);

create index if not exists pedidos_cliente_idx on public.pedidos (cliente_id);
create index if not exists pedidos_estado_idx  on public.pedidos (estado);

-- 3) CUPONES: cupones generados (bienvenida y fidelidad).
--    Los de fidelidad son únicos y de un solo uso, ligados a un cliente.
create table if not exists public.cupones (
  codigo      text primary key,            -- ej. GRACIAS20-A8F3 o PRIMERA15
  cliente_id  uuid references public.clientes(id) on delete cascade, -- null = público
  porcentaje  integer not null,            -- ej. 15, 20
  tipo        text not null default 'fidelidad'
              check (tipo in ('bienvenida','fidelidad')),
  usado       boolean not null default false,
  creado_en   timestamptz not null default now()
);

create index if not exists cupones_cliente_idx on public.cupones (cliente_id);

-- ============================================================
--  Seguridad (RLS): activamos Row Level Security en las 3 tablas.
--  No agregamos políticas públicas: así NADIE puede leer/escribir
--  con la clave pública. La web accede solo desde el servidor con la
--  clave service_role (que pasa por encima de RLS de forma segura).
-- ============================================================
alter table public.clientes enable row level security;
alter table public.pedidos  enable row level security;
alter table public.cupones  enable row level security;

-- Cupón público de bienvenida (15% primera compra por la web).
insert into public.cupones (codigo, cliente_id, porcentaje, tipo, usado)
values ('PRIMERA15', null, 15, 'bienvenida', false)
on conflict (codigo) do nothing;
