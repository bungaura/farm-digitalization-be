 
-- -- CREATE DATABASE farm_db;
-- -- USE farm_db;

-- -- -- Set up database tables for farm backend system

-- -- CREATE TABLE Users (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     email VARCHAR(100) UNIQUE NOT NULL,
-- --     pass VARCHAR(255) NOT NULL,
-- --     role ENUM('OWNER', 'OPERATOR') NOT NULL, 
-- --     name VARCHAR(100) NOT NULL
-- -- );

-- -- CREATE TABLE Farms (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     name VARCHAR(100) NOT NULL,
-- --     owner_id CHAR(36) NOT NULaL, 
-- --     FOREIGN KEY (owner_id) REFERENCES Users(id) ON DELETE CASCADE
-- -- );

-- -- CREATE TABLE UserFarms (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     user_id CHAR(36) NOT NULL, 
-- --     farm_id CHAR(36) NOT NULL, 
-- --     role ENUM('OWNER', 'OPERATOR') NOT NULL, 
-- --     FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
-- --     FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE,
-- --     UNIQUE (user_id, farm_id) 
-- -- );

-- -- CREATE TABLE LivestockTypes (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     type CHAR(30) NOT NULL
-- -- );

-- -- CREATE TABLE Breeds (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     type_id CHAR(36) NOT NULL, 
-- --     name VARCHAR(100) NOT NULL UNIQUE, 
-- --     FOREIGN KEY (type_id) REFERENCES LivestockTypes(id) ON DELETE CASCADE
-- -- );

-- -- CREATE TABLE Medications (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     name VARCHAR(100) NOT NULL,
-- --     type ENUM('VITAMIN', 'VACCINE', 'MEDICINE') NOT NULL
-- -- );

-- -- CREATE TABLE Diseases (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     name VARCHAR(100) NOT NULL
-- -- );

-- -- CREATE TABLE PhasesConfiguration (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     farm_id CHAR(36) NOT NULL, 
-- --     phase_name ENUM('CEMPE', 'DARA', 'SIAPKAWIN', 'HAMIL', 'BREASTFEEDING') NOT NULL,
-- --     duration_months INT NOT NULL,
-- --     FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE
-- -- );

-- -- CREATE TABLE Livestock (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     farm_id CHAR(36) NOT NULL,
-- --     name_id VARCHAR(50) NOT NULL, 
-- --     gender ENUM('MALE', 'FEMALE') NOT NULL,
-- --     breed_id CHAR(36) NOT NULL REFERENCES Breeds(id) ON DELETE SET NULL,
-- --     dob DATE NOT NULL,
-- --     weight DECIMAL(10, 2),
-- --     phase ENUM('CEMPE', 'DARA', 'SIAPKAWIN', 'HAMIL', 'MENYUSUI'),
-- --     photo_url VARCHAR(255),
-- --     mother_id CHAR(36), 
-- --     father_id CHAR(36), 
-- --     grade VARCHAR(50),
-- --     type_id CHAR(36) NOT NULL, 
-- --     FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE,
-- --     FOREIGN KEY (mother_id) REFERENCES Livestock(id) ON DELETE SET NULL,
-- --     FOREIGN KEY (father_id) REFERENCES Livestock(id) ON DELETE SET NULL,
-- --     UNIQUE (farm_id, name_id) -- Custom ID must be unique per farm
-- -- );

-- -- CREATE TABLE Lactation (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     livestock_id CHAR(36) NOT NULL,
-- --     lactation_number INT NOT NULL,
-- --     offspring_count INT NOT NULL,
-- --     male_offspring_count INT NOT NULL,
-- --     female_offspring_count INT NOT NULL, 
-- --     colostrum_quantity DECIMAL(10, 2), 
-- --     birth_date DATE NOT NULL, 
-- --     FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
-- -- );

-- -- CREATE TABLE LivestockMedication (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     livestock_id CHAR(36) NOT NULL,
-- --     medication_id CHAR(36) NOT NULL, 
-- --     date_given DATE NOT NULL, 
-- --     description TEXT NOT NULL, 
-- --     user_id CHAR(36) NOT NULL,
-- --     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
-- --     FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE,
-- --     FOREIGN KEY (medication_id) REFERENCES Medications(id) ON DELETE CASCADE,
-- --     FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
-- -- );

-- -- CREATE TABLE LivestockDisease (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     livestock_id CHAR(36) NOT NULL,
-- --     disease_id CHAR(36) NOT NULL,
-- --     date_diagnosed DATE NOT NULL,
-- --     description TEXT NOT NULL,
-- --     user_id CHAR(36) NOT NULL,
-- --     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
-- --     FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE,
-- --     FOREIGN KEY (disease_id) REFERENCES Diseases(id) ON DELETE CASCADE,
-- --     FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
-- -- );

-- -- CREATE TABLE MilkProduction (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     livestock_id CHAR(36) NOT NULL, 
-- --     dateOfProduction DATE NOT NULL,
-- --     quantity DECIMAL(10, 2) NOT NULL,
-- --     FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
-- -- );

-- -- CREATE TABLE Certificates (
-- --     id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
-- --     livestock_id CHAR(36) NOT NULL,
-- --     pdf_url VARCHAR(255),
-- --     FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
-- -- );

-- -- -- Insertion of the dummy data of the Ternakku farm database

-- -- INSERT INTO LivestockTypes (id, type)
-- -- VALUES
-- -- (UUID(), 'COW'),
-- -- (UUID(), 'GOAT');

-- -- INSERT INTO Breeds (id, type_id, name)
-- -- VALUES
-- -- (UUID(), (SELECT id FROM LivestockTypes WHERE type = 'GOAT'), 'Saanen'),
-- -- (UUID(), (SELECT id FROM LivestockTypes WHERE type = 'GOAT'), 'Boer');

-- -- INSERT INTO Diseases (id, name)
-- -- VALUES
-- -- (UUID(), 'Kembung'),
-- -- (UUID(), 'Mencret'),
-- -- (UUID(), 'Pink eye'),
-- -- (UUID(), 'Batuk dan pilek'),
-- -- (UUID(), 'Kudis'),
-- -- (UUID(), 'Ambruk'),
-- -- (UUID(), 'Cacingan'),
-- -- (UUID(), 'Scarbies'),
-- -- (UUID(), 'ORF'),
-- -- (UUID(), 'Mastitis'),
-- -- (UUID(), 'Referensi placenta'),
-- -- (UUID(), 'Prolapsus'),
-- -- (UUID(), 'Radang sendi');

-- -- INSERT INTO Medications (id, name, type)
-- -- VALUES
-- -- (UUID(), 'Vermectin', 'MEDICINE'),
-- -- (UUID(), 'Super Tetra', 'MEDICINE'),
-- -- (UUID(), 'Entrostop', 'MEDICINE'),
-- -- (UUID(), 'Rivanol', 'MEDICINE'),
-- -- (UUID(), 'Kalbazen', 'MEDICINE'),
-- -- (UUID(), 'Betadine', 'MEDICINE'),
-- -- (UUID(), 'Typanol', 'MEDICINE'),
-- -- (UUID(), 'Fludoxin', 'MEDICINE'),
-- -- (UUID(), 'Intermectin', 'MEDICINE');

-- -- INSERT INTO Medications (id, name, type)
-- -- VALUES
-- -- (UUID(), 'Vitamin B Complex', 'VITAMIN'),
-- -- (UUID(), 'Biosan', 'VITAMIN'),
-- -- (UUID(), 'Calcidex', 'VITAMIN'),
-- -- (UUID(), 'Premix', 'VITAMIN');

-- -- INSERT INTO Medications (id, name, type)
-- -- VALUES
-- -- (UUID(), 'Vaksin Penyakit Kuku dan Mulut (PKM)', 'VACCINE');

-- -- INSERT INTO Users (id, email, pass, role, name)
-- -- VALUES
-- -- (UUID(), 'owner1@example.com', 'password123', 'OWNER', 'Herman');

-- -- INSERT INTO Users (id, email, pass, role, name)
-- -- VALUES
-- -- (UUID(), 'operator1@example.com', 'password123', 'OPERATOR', 'Setya');

-- -- INSERT INTO Farms (id, name, owner_id)
-- -- VALUES
-- -- (UUID(), 'Jatidiri Farm', (SELECT id FROM Users WHERE email = 'owner1@example.com'));

-- -- INSERT INTO UserFarms (id, user_id, farm_id, role)
-- -- VALUES
-- -- (UUID(), 
-- --  (SELECT id FROM Users WHERE email = 'owner1@example.com'), 
-- --  (SELECT id FROM Farms WHERE name = 'Jatidiri Farm'), 
-- --  'OWNER');

-- -- INSERT INTO UserFarms (id, user_id, farm_id, role)
-- -- VALUES
-- -- (UUID(), 
-- --  (SELECT id FROM Users WHERE email = 'operator1@example.com'), 
-- --  (SELECT id FROM Farms WHERE name = 'Jatidiri Farm'), 
-- --  'OPERATOR');

-- CREATE DATABASE IF NOT EXISTS new_farm_db;
-- USE new_farm_db;

-- -- Table: Users
-- CREATE TABLE IF NOT EXISTS Users (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     email VARCHAR(100) UNIQUE NOT NULL,
--     pass VARCHAR(255) NOT NULL,
--     role ENUM('OWNER', 'OPERATOR') NOT NULL,
--     name VARCHAR(100) NOT NULL,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- -- Table: Farms
-- CREATE TABLE IF NOT EXISTS Farms (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     name VARCHAR(100) NOT NULL,
--     owner_id CHAR(36) NOT NULL,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (owner_id) REFERENCES Users(id) ON DELETE CASCADE
-- );

-- -- Table: UserFarms
-- CREATE TABLE IF NOT EXISTS UserFarms (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     user_id CHAR(36) NOT NULL,
--     farm_id CHAR(36) NOT NULL,
--     role ENUM('OWNER', 'OPERATOR') NOT NULL,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
--     FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE,
--     UNIQUE (user_id, farm_id)
-- );

-- -- Table: LivestockTypes
-- CREATE TABLE IF NOT EXISTS LivestockTypes (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     type VARCHAR(30) NOT NULL,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- -- Table: Breeds
-- CREATE TABLE IF NOT EXISTS Breeds (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     type_id CHAR(36) NOT NULL,
--     name VARCHAR(100) UNIQUE NOT NULL,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (type_id) REFERENCES LivestockTypes(id) ON DELETE CASCADE
-- );

-- -- Table: Diseases
-- CREATE TABLE IF NOT EXISTS Diseases (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     name VARCHAR(100) NOT NULL,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- -- Table: Medications
-- CREATE TABLE IF NOT EXISTS Medications (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     name VARCHAR(100) NOT NULL,
--     type ENUM('VITAMIN', 'VACCINE', 'MEDICINE') NOT NULL,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- -- Table: PhasesConfiguration
-- CREATE TABLE IF NOT EXISTS PhasesConfiguration (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     farm_id CHAR(36) NOT NULL,
--     phase_name ENUM('CEMPE', 'LEPAS SAPIH', 'DARA', 'SIAP KAWIN', 'HAMIL', 'MENYUSUI', 'AFKIR') NOT NULL,
--     duration_months INT NOT NULL,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE
-- );

-- -- Table: Livestock
-- CREATE TABLE IF NOT EXISTS Livestock (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     farm_id CHAR(36) NOT NULL,
--     name_id VARCHAR(50) NOT NULL,
--     gender ENUM('MALE', 'FEMALE') NOT NULL,
--     dob DATE NOT NULL,
--     weight DECIMAL(10, 2),
--     phase ENUM('CEMPE', 'LEPAS SAPIH', 'DARA', 'SIAP KAWIN', 'HAMIL', 'MENYUSUI', 'AFKIR'),
--     photo_url VARCHAR(255),
--     grade VARCHAR(50),
--     breed_id CHAR(36) NOT NULL,
--     type_id CHAR(36) NOT NULL,
--     mother_id CHAR(36),
--     father_id CHAR(36),
--     qr_image VARCHAR(255),
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE,
--     FOREIGN KEY (breed_id) REFERENCES Breeds(id) ON DELETE SET NULL,
--     FOREIGN KEY (mother_id) REFERENCES Livestock(id) ON DELETE SET NULL,
--     FOREIGN KEY (father_id) REFERENCES Livestock(id) ON DELETE SET NULL,
--     UNIQUE (farm_id, name_id)
-- );

-- -- Table: Lactation
-- CREATE TABLE IF NOT EXISTS Lactation (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     livestock_id CHAR(36) NOT NULL,
--     lactation_number INT NOT NULL,
--     offspring_count INT NOT NULL,
--     male_offspring_count INT NOT NULL,
--     female_offspring_count INT NOT NULL,
--     colostrum_quantity DECIMAL(10, 2),
--     birth_date DATE NOT NULL,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
-- );

-- -- Table: LivestockMedication
-- CREATE TABLE IF NOT EXISTS LivestockMedication (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     livestock_id CHAR(36) NOT NULL,
--     medication_id CHAR(36) NOT NULL,
--     date_given DATE NOT NULL,
--     description TEXT NOT NULL,
--     user_id CHAR(36) NOT NULL,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE,
--     FOREIGN KEY (medication_id) REFERENCES Medications(id) ON DELETE CASCADE,
--     FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
-- );

-- -- Table: LivestockDisease
-- CREATE TABLE IF NOT EXISTS LivestockDisease (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     livestock_id CHAR(36) NOT NULL,
--     disease_id CHAR(36) NOT NULL,
--     date_diagnosed DATE NOT NULL,
--     description TEXT NOT NULL,
--     user_id CHAR(36) NOT NULL,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE,
--     FOREIGN KEY (disease_id) REFERENCES Diseases(id) ON DELETE CASCADE,
--     FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
-- );

-- -- Table: MilkProduction
-- CREATE TABLE IF NOT EXISTS MilkProduction (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     livestock_id CHAR(36) NOT NULL,
--     date_of_production DATE NOT NULL,
--     quantity DECIMAL(10, 2) NOT NULL,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
-- );

-- -- Table: Certificates
-- CREATE TABLE IF NOT EXISTS Certificates (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     livestock_id CHAR(36) NOT NULL,
--     pdf_url VARCHAR(255),
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
-- );

-- -- Table: Logs
-- CREATE TABLE IF NOT EXISTS Logs (
--     id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--     action VARCHAR(255) NOT NULL,
--     user_id CHAR(36) NOT NULL,
--     farm_id CHAR(36) NOT NULL,
--     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
--     FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE
-- );

-- Menambahkan tabel baru jika belum ada

CREATE TABLE IF NOT EXISTS Lactation (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    livestock_id CHAR(36) NOT NULL,
    lactation_number INT NOT NULL,
    offspring_count INT NOT NULL,
    male_offspring_count INT NOT NULL,
    female_offspring_count INT NOT NULL,
    colostrum_quantity DECIMAL(10, 2),
    birth_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MilkProduction (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    livestock_id CHAR(36) NOT NULL,
    dateOfProduction DATE NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS LivestockMedication (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    livestock_id CHAR(36) NOT NULL,
    medication_id CHAR(36) NOT NULL,
    date_given DATE NOT NULL,
    description TEXT NOT NULL,
    user_id CHAR(36) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE,
    FOREIGN KEY (medication_id) REFERENCES Medications(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS LivestockDisease (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    livestock_id CHAR(36) NOT NULL,
    disease_id CHAR(36) NOT NULL,
    date_diagnosed DATE NOT NULL,
    description TEXT NOT NULL,
    user_id CHAR(36) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE,
    FOREIGN KEY (disease_id) REFERENCES Diseases(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Menambahkan kolom updated_at pada tabel yang sudah ada

ALTER TABLE Users ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE Farms ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE UserFarms ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE Livestock ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE Breeds ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE LivestockTypes ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE Medications ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE Diseases ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE PhasesConfiguration ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
