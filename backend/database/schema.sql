-- RentFlow PostgreSQL starter schema
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(30) NOT NULL CHECK (role IN ('admin','owner','tenant')),
  phone VARCHAR(30),
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(200),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES owners(id),
  name VARCHAR(200) NOT NULL,
  address1 VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  province_state VARCHAR(100),
  postal_code VARCHAR(30),
  property_type VARCHAR(50),
  status VARCHAR(30) DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  unit_number VARCHAR(50) NOT NULL,
  bedrooms NUMERIC(4,1),
  bathrooms NUMERIC(4,1),
  rent_amount NUMERIC(12,2),
  status VARCHAR(30) DEFAULT 'vacant',
  UNIQUE(property_id, unit_number)
);

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  emergency_contact JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE leases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  unit_id UUID NOT NULL REFERENCES units(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  monthly_rent NUMERIC(12,2) NOT NULL,
  deposit_amount NUMERIC(12,2) DEFAULT 0,
  status VARCHAR(30) DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  lease_id UUID NOT NULL REFERENCES leases(id),
  amount NUMERIC(12,2) NOT NULL,
  due_date DATE,
  payment_date TIMESTAMPTZ,
  payment_method VARCHAR(50),
  provider_transaction_id VARCHAR(255),
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE maintenance_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id),
  tenant_id UUID REFERENCES tenants(id),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(30) DEFAULT 'open',
  assigned_to VARCHAR(200),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),
  property_id UUID REFERENCES properties(id),
  unit_id UUID REFERENCES units(id),
  lease_id UUID REFERENCES leases(id),
  category VARCHAR(40) NOT NULL CHECK (category IN ('tenant_evidence','legal','lease','maintenance','other')),
  document_type VARCHAR(100),
  file_name VARCHAR(255) NOT NULL,
  storage_key TEXT NOT NULL,
  mime_type VARCHAR(100),
  uploaded_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(30) NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_properties_owner ON properties(owner_id);
CREATE INDEX idx_units_property ON units(property_id);
CREATE INDEX idx_leases_tenant ON leases(tenant_id);
CREATE INDEX idx_payments_lease ON payments(lease_id);
CREATE INDEX idx_maintenance_unit ON maintenance_requests(unit_id);
CREATE INDEX idx_documents_tenant ON documents(tenant_id);
