import knex from 'knex';
import config from './knexfile';

export const db = knex(config);

export interface Company {
  id: number;
  name: string;
  domain: string;
  description?: string;
  logo_url?: string;
  country?: string;
  city?: string;
  industry?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Contact {
  id: number;
  company_id: number;
  name: string;
  email?: string;
  phone?: string;
  position?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: number;
  company_id: number;
  name: string;
  description?: string;
  price?: number;
  created_at: Date;
  updated_at: Date;
}

export const CompanyModel = {
  async getAll() {
    return db<Company>('companies').select('*');
  },

  async getById(id: number) {
    return db<Company>('companies').where({ id }).first();
  },

  async getByDomain(domain: string) {
    return db<Company>('companies').where({ domain }).first();
  },

  async create(data: Partial<Company>) {
    const [id] = await db<Company>('companies').insert(data).returning('id');
    return this.getById(id);
  },

  async update(id: number, data: Partial<Company>) {
    await db<Company>('companies').where({ id }).update(data);
    return this.getById(id);
  },

  async delete(id: number) {
    return db<Company>('companies').where({ id }).delete();
  }
};

export const ContactModel = {
  async getAllByCompany(companyId: number) {
    return db<Contact>('contacts').where({ company_id: companyId });
  },

  async create(data: Partial<Contact>) {
    const [id] = await db<Contact>('contacts').insert(data).returning('id');
    return db<Contact>('contacts').where({ id }).first();
  }
};

export const ProductModel = {
  async getAllByCompany(companyId: number) {
    return db<Product>('products').where({ company_id: companyId });
  },

  async create(data: Partial<Product>) {
    const [id] = await db<Product>('products').insert(data).returning('id');
    return db<Product>('products').where({ id }).first();
  }
};
