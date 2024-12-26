
-- Set up database tables for Ternakku farm backend system

CREATE TABLE Users (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL,
    role ENUM('OWNER', 'OPERATOR') NOT NULL, 
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Farms (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    owner_id CHAR(36) NOT NULL, 
    FOREIGN KEY (owner_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE UserFarms (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    user_id CHAR(36) NOT NULL, 
    farm_id CHAR(36) NOT NULL, 
    role ENUM('OWNER', 'OPERATOR') NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE,
    UNIQUE (user_id, farm_id) 
);

CREATE TABLE Breeds (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    type_id CHAR(36) NOT NULL, 
    name VARCHAR(100) NOT NULL UNIQUE, 
    FOREIGN KEY (type_id) REFERENCES LivestockTypes(id) ON DELETE CASCADE
);

CREATE TABLE Medications (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('VITAMIN', 'VACCINE', 'MEDICINE') NOT NULL
);

CREATE TABLE Diseases (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Certificates (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    livestock_id CHAR(36) NOT NULL,
    pdf_url VARCHAR(255),
    FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
);

CREATE TABLE PhasesConfiguration (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    farm_id CHAR(36) NOT NULL, 
    phase_name ENUM('CEMPE', 'DARA', 'SIAPKAWIN', 'HAMIL', 'BREASTFEEDING') NOT NULL,
    duration_months INT NOT NULL,
    FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE
);

CREATE TABLE Lactation (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    livestock_id CHAR(36) NOT NULL,
    lactation_number INT NOT NULL,
    offspring_count INT NOT NULL,
    male_offspring_count INT NOT NULL,
    female_offspring_count INT NOT NULL, 
    colostrum_quantity DECIMAL(10, 2), 
    birth_date DATE NOT NULL, 
    FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
);

CREATE TABLE LivestockTypes (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    type CHAR(30) NOT NULL
);

CREATE TABLE LivestockMedication (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    livestock_id CHAR(36) NOT NULL,
    medication_id CHAR(36) NOT NULL, 
    date_given DATE NOT NULL, 
    description TEXT NOT NULL, 
    user_id CHAR(36) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE,
    FOREIGN KEY (medication_id) REFERENCES Medications(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE LivestockDisease (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    livestock_id CHAR(36) NOT NULL,
    disease_id CHAR(36) NOT NULL,
    date_diagnosed DATE NOT NULL,
    description TEXT NOT NULL,
    user_id CHAR(36) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE,
    FOREIGN KEY (disease_id) REFERENCES Diseases(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Livestock (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    farm_id CHAR(36) NOT NULL,
    name_id VARCHAR(50) NOT NULL, 
    gender ENUM('MALE', 'FEMALE') NOT NULL,
    breed_id CHAR(36) NOT NULL REFERENCES Breeds(id) ON DELETE SET NULL,
    dob DATE NOT NULL,
    weight DECIMAL(10, 2),
    phase ENUM('CEMPE', 'DARA', 'SIAPKAWIN', 'HAMIL', 'MENYUSUI'),
    photo_url VARCHAR(255),
    mother_id CHAR(36), 
    father_id CHAR(36), 
    grade VARCHAR(50),
    type_id CHAR(36) NOT NULL, 
    FOREIGN KEY (farm_id) REFERENCES Farms(id) ON DELETE CASCADE,
    FOREIGN KEY (mother_id) REFERENCES Livestock(id) ON DELETE SET NULL,
    FOREIGN KEY (father_id) REFERENCES Livestock(id) ON DELETE SET NULL,
    UNIQUE (farm_id, name_id) -- Custom ID must be unique per farm
);

CREATE TABLE MilkProduction (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    livestock_id CHAR(36) NOT NULL, 
    dateOfProduction DATE NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (livestock_id) REFERENCES Livestock(id) ON DELETE CASCADE
);

-- Insertion of the dummy data of the Ternakku farm database

INSERT INTO LivestockTypes (id, type)
VALUES
(UUID(), 'COW'),
(UUID(), 'GOAT');

INSERT INTO Breeds (id, type_id, name)
VALUES
(UUID(), (SELECT id FROM LivestockTypes WHERE type = 'GOAT'), 'Saanen'),
(UUID(), (SELECT id FROM LivestockTypes WHERE type = 'GOAT'), 'Boer');

INSERT INTO Diseases (id, name)
VALUES
(UUID(), 'Kembung'),
(UUID(), 'Mencret'),
(UUID(), 'Pink eye'),
(UUID(), 'Batuk dan pilek'),
(UUID(), 'Kudis'),
(UUID(), 'Ambruk'),
(UUID(), 'Cacingan'),
(UUID(), 'Scarbies'),
(UUID(), 'ORF'),
(UUID(), 'Mastitis'),
(UUID(), 'Referensi placenta'),
(UUID(), 'Prolapsus'),
(UUID(), 'Radang sendi');

INSERT INTO Medications (id, name, type)
VALUES
(UUID(), 'Vermectin', 'MEDICINE'),
(UUID(), 'Super Tetra', 'MEDICINE'),
(UUID(), 'Entrostop', 'MEDICINE'),
(UUID(), 'Rivanol', 'MEDICINE'),
(UUID(), 'Kalbazen', 'MEDICINE'),
(UUID(), 'Betadine', 'MEDICINE'),
(UUID(), 'Typanol', 'MEDICINE'),
(UUID(), 'Fludoxin', 'MEDICINE'),
(UUID(), 'Intermectin', 'MEDICINE');

INSERT INTO Medications (id, name, type)
VALUES
(UUID(), 'Vitamin B Complex', 'VITAMIN'),
(UUID(), 'Biosan', 'VITAMIN'),
(UUID(), 'Calcidex', 'VITAMIN'),
(UUID(), 'Premix', 'VITAMIN');

INSERT INTO Medications (id, name, type)
VALUES
(UUID(), 'Vaksin Penyakit Kuku dan Mulut (PKM)', 'VACCINE');

INSERT INTO Users (id, email, pass, role, name)
VALUES
(UUID(), 'owner1@example.com', 'password123', 'OWNER', 'Herman');

INSERT INTO Users (id, email, pass, role, name)
VALUES
(UUID(), 'operator1@example.com', 'password123', 'OPERATOR', 'Setya');

INSERT INTO Farms (id, name, owner_id)
VALUES
(UUID(), 'Jatidiri Farm', (SELECT id FROM Users WHERE email = 'owner1@example.com'));

INSERT INTO UserFarms (id, user_id, farm_id, role)
VALUES
(UUID(), 
 (SELECT id FROM Users WHERE email = 'owner1@example.com'), 
 (SELECT id FROM Farms WHERE name = 'Jatidiri Farm'), 
 'OWNER');

INSERT INTO UserFarms (id, user_id, farm_id, role)
VALUES
(UUID(), 
 (SELECT id FROM Users WHERE email = 'operator1@example.com'), 
 (SELECT id FROM Farms WHERE name = 'Jatidiri Farm'), 
 'OPERATOR');