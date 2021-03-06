
const pg = require ('pg');

const client = new pg.Client('postgres://localhost/robbys_law_firm_db');

const synchAndSeed = async() => {
    const SQL = `

        DROP TABLE IF EXISTS job_title; 
        DROP TABLE IF EXISTS lawyers;
        
        CREATE TABLE lawyers(
            id INTEGER PRIMARY KEY,
            name VARCHAR(100) NOT NULL

        );

        CREATE TABLE job_title(
            id INTEGER PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            lawyer_id INTEGER REFERENCES lawyers(id)
        );

        INSERT INTO lawyers (id,name) VALUES (1,'Amy');
        INSERT INTO lawyers (id,name) VALUES (2,'Elaine');
        INSERT INTO lawyers (id,name) VALUES (3,'Abe');
        INSERT INTO lawyers (id,name) VALUES (4,'Louise');
        INSERT INTO job_title(id,name,lawyer_id) VALUES (1, 'defense_attorney', 1);
        INSERT INTO job_title(id,name,lawyer_id) VALUES (2, 'party_planner', 1);
        INSERT INTO job_title(id,name,lawyer_id) VALUES (3, 'prosecutor', 2);
        INSERT INTO job_title(id,name,lawyer_id) VALUES (4, 'social_media_director', 2);
        INSERT INTO job_title(id,name,lawyer_id) VALUES (5, 'entertainment_attorney', 3);
        INSERT INTO job_title(id,name,lawyer_id) VALUES (6, 'HR_director', 3);
        INSERT INTO job_title(id,name,lawyer_id) VALUES (7, 'tax_attorney', 4);
        INSERT INTO job_title(id,name,lawyer_id) VALUES (8, 'website_manager', 4);    

    
    `;
    await client.query(SQL);

};

module.exports = {

    client,
    synchAndSeed,
}