BEGIN TRANSACTION;

CREATE TABLE property (
    id SERIAL PRIMARY KEY,
    img text,
    title text,
    description text,
    address text,
    asking_price numeric
);

COMMIT;