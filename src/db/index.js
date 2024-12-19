import knex from 'knex';
import config from './knexfile';
export const db = knex(config);
export const CompanyModel = {
    async getAll() {
        return db('companies').select('*');
    },
    async getById(id) {
        return db('companies').where({ id }).first();
    },
    async getByDomain(domain) {
        return db('companies').where({ domain }).first();
    },
    async create(data) {
        const [id] = await db('companies').insert(data).returning('id');
        return this.getById(id);
    },
    async update(id, data) {
        await db('companies').where({ id }).update(data);
        return this.getById(id);
    },
    async delete(id) {
        return db('companies').where({ id }).delete();
    }
};
export const ContactModel = {
    async getAllByCompany(companyId) {
        return db('contacts').where({ company_id: companyId });
    },
    async create(data) {
        const [id] = await db('contacts').insert(data).returning('id');
        return db('contacts').where({ id }).first();
    }
};
export const ProductModel = {
    async getAllByCompany(companyId) {
        return db('products').where({ company_id: companyId });
    },
    async create(data) {
        const [id] = await db('products').insert(data).returning('id');
        return db('products').where({ id }).first();
    }
};
