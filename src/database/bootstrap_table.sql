-- online_shop_bootstrap.sql

-- Drop existing tables if they exist
DROP TABLE IF EXISTS product_tags;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- Create the Category table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the Product table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the Product_Category junction table for many-to-many relationship
CREATE TABLE product_categories (
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

-- Create the ProductImage table
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the ProductTag table
CREATE TABLE product_tags (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_product_categories_product_id ON product_categories(product_id);
CREATE INDEX idx_product_categories_category_id ON product_categories(category_id);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_tags_product_id ON product_tags(product_id);
CREATE INDEX idx_product_tags_tag ON product_tags(tag);

-- Insert sample data
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Clothing', 'Apparel and fashion items'),
('Books', 'Physical and digital books'),
('Home & Garden', 'Items for home improvement and gardening'),
('Toys & Games', 'Entertainment for all ages'),
('Sports & Outdoors', 'Equipment for sports and outdoor activities'),
('Beauty & Personal Care', 'Cosmetics and personal care products'),
('Automotive', 'Parts and accessories for vehicles'),
('Food & Grocery', 'Edible items and household supplies'),
('Pet Supplies', 'Products for pets');

INSERT INTO products (name, description, price, stock_quantity) VALUES
('Smartphone', '<p>A high-end smartphone with advanced features.</p>', 699.99, 50),
('T-shirt', '<p>A comfortable cotton t-shirt.</p>', 19.99, 100),
('Python Programming', '<p>A comprehensive guide to Python programming.</p>', 39.99, 30),
('Garden Hose', '<p>Durable 50ft garden hose.</p>', 29.99, 75),
('Board Game', '<p>Family-friendly strategy board game.</p>', 24.99, 40),
('Tennis Racket', '<p>Professional-grade tennis racket.</p>', 89.99, 25),
('Lipstick', '<p>Long-lasting matte lipstick.</p>', 14.99, 60),
('Car Phone Mount', '<p>Adjustable car phone holder.</p>', 19.99, 80),
('Organic Coffee', '<p>Fair-trade organic coffee beans.</p>', 12.99, 100),
('Dog Leash', '<p>Retractable dog leash for medium to large dogs.</p>', 24.99, 45);

INSERT INTO product_categories (product_id, category_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
(1, 5), (2, 6), (3, 5), (4, 6), (5, 3);

INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(1, 'https://picsum.photos/200', true),
(1, 'https://picsum.photos/200', false),
(2, 'https://picsum.photos/200', true),
(3, 'https://picsum.photos/200', true),
(4, 'https://picsum.photos/200', true),
(5, 'https://picsum.photos/200', true),
(6, 'https://picsum.photos/200', true),
(7, 'https://picsum.photos/200', true),
(8, 'https://picsum.photos/200', true),
(9, 'https://picsum.photos/200', true),
(10, 'https://picsum.photos/200', true),
(2, 'https://picsum.photos/200', false),
(3, 'https://picsum.photos/200', false);

INSERT INTO product_tags (product_id, tag) VALUES
(1, 'tech'), (1, 'mobile'), (1, 'smartphone'),
(2, 'apparel'), (2, 'casual'), (2, 'fashion'),
(3, 'education'), (3, 'programming'), (3, 'computer science'),
(4, 'garden'), (4, 'outdoor'), (4, 'home improvement'),
(5, 'entertainment'), (5, 'family'), (5, 'indoor activity'),
(6, 'sports'), (6, 'tennis'), (6, 'fitness'),
(7, 'beauty'), (7, 'makeup'), (7, 'cosmetics'),
(8, 'car accessory'), (8, 'phone accessory'), (8, 'travel'),
(9, 'food'), (9, 'beverage'), (9, 'organic'),
(10, 'pet'), (10, 'dog'), (10, 'pet accessory');

-- Sample queries

-- Get all products with their primary image and categories
SELECT p.id, p.name, p.price, pi.image_url, STRING_AGG(c.name, ', ') as categories
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
LEFT JOIN product_categories pc ON p.id = pc.product_id
LEFT JOIN categories c ON pc.category_id = c.id
GROUP BY p.id, p.name, p.price, pi.image_url;

-- Get all products with their tags
SELECT p.id, p.name, STRING_AGG(pt.tag, ', ') as tags
FROM products p
LEFT JOIN product_tags pt ON p.id = pt.product_id
GROUP BY p.id, p.name;

-- Get products in a specific category
SELECT p.id, p.name, p.price
FROM products p
JOIN product_categories pc ON p.id = pc.product_id
JOIN categories c ON pc.category_id = c.id
WHERE c.name = 'Electronics';

-- Search products by tag
SELECT DISTINCT p.id, p.name, p.price
FROM products p
JOIN product_tags pt ON p.id = pt.product_id
WHERE pt.tag = 'tech';