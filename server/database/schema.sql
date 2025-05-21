DROP TABLE IF EXISTS favorite;

DROP TABLE IF EXISTS cocktail_ingredient;

DROP TABLE IF EXISTS ingredient;

DROP TABLE IF EXISTS cocktail;

DROP TABLE IF EXISTS user;

-- server/database/schema.sql
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE cocktail (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    alcoholic BOOLEAN,
    glass VARCHAR(100),
    instructions TEXT
);

CREATE TABLE ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE cocktail_ingredient (
    cocktail_id INT,
    ingredient_id INT,
    measure VARCHAR(100),
    PRIMARY KEY (cocktail_id, ingredient_id),
    FOREIGN KEY (cocktail_id) REFERENCES cocktail (id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id) ON DELETE CASCADE
);

CREATE TABLE favorite (
    user_id INT,
    cocktail_id INT,
    PRIMARY KEY (user_id, cocktail_id),
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (cocktail_id) REFERENCES cocktail (id) ON DELETE CASCADE
);