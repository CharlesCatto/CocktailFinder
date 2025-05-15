-- Table principale des cocktails
CREATE TABLE cocktails (
    id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    alcoholic BOOLEAN DEFAULT TRUE,
    glass_type VARCHAR(50),
    instructions TEXT,
    thumbnail_url VARCHAR(255),
    video_url VARCHAR(255),
    iba_category VARCHAR(50),
    tags VARCHAR(255),
    date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creative_commons_confirmed BOOLEAN DEFAULT FALSE
);

-- Table des ingrédients (liste unique)
CREATE TABLE ingredients (
    id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Table de liaison cocktail-ingrédients (avec mesures)
CREATE TABLE cocktail_ingredients (
    cocktail_id VARCHAR(36),
    ingredient_id VARCHAR(36),
    measure VARCHAR(50),
    ingredient_order INT,
    PRIMARY KEY (cocktail_id, ingredient_id),
    FOREIGN KEY (cocktail_id) REFERENCES cocktails (id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
);

-- Table des traductions d'instructions
CREATE TABLE instructions_translations (
    cocktail_id VARCHAR(36),
    language_code CHAR(2) NOT NULL, -- 'fr', 'es', 'de', etc.
    translation TEXT NOT NULL,
    PRIMARY KEY (cocktail_id, language_code),
    FOREIGN KEY (cocktail_id) REFERENCES cocktails (id) ON DELETE CASCADE
);

-- Table des images alternatives
CREATE TABLE alternative_images (
    id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    cocktail_id VARCHAR(36),
    image_url VARCHAR(255) NOT NULL,
    attribution TEXT,
    source_url VARCHAR(255),
    FOREIGN KEY (cocktail_id) REFERENCES cocktails (id) ON DELETE CASCADE
);