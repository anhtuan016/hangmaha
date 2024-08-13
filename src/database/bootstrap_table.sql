-- online_shop_bootstrap.sql

-- Drop existing tables if they exist
DROP TABLE IF EXISTS product_tags;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS tags;

-- Create the Category table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create the Product table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create the Tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create the Product_Tag junction table for many-to-many relationship
CREATE TABLE product_tags (
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, tag_id)
);

-- Create indexes for better performance
CREATE INDEX idx_product_categories_product_id ON product_categories(product_id);
CREATE INDEX idx_product_categories_category_id ON product_categories(category_id);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_tags_product_id ON product_tags(product_id);
CREATE INDEX idx_product_tags_tag_id ON product_tags(tag_id);

-- Create indexes for deleted_at columns
CREATE INDEX idx_categories_deleted_at ON categories(deleted_at);
CREATE INDEX idx_products_deleted_at ON products(deleted_at);
CREATE INDEX idx_product_images_deleted_at ON product_images(deleted_at);
CREATE INDEX idx_tags_deleted_at ON tags(deleted_at);

-- Insert test data into categories table
INSERT INTO categories (name, description) VALUES
('Electronics', 'Gadgets and electronic devices'),
('Clothing', 'Apparel for all ages'),
('Books', 'Physical and digital books'),
('Home & Garden', 'Items for home improvement and gardening'),
('Toys & Games', 'Entertainment for all ages'),
('Sports & Outdoors', 'Equipment for sports and outdoor activities'),
('Beauty & Personal Care', 'Cosmetics and personal care products'),
('Automotive', 'Parts and accessories for vehicles'),
('Food & Grocery', 'Edible items and household supplies'),
('Pet Supplies', 'Products for pets'),
('Jewelry', 'Precious and fashion jewelry'),
('Office Supplies', 'Items for office and school use');

-- Insert test data into products table
INSERT INTO products (name, description, price, stock_quantity) VALUES
('Smartphone X', 'Latest model with advanced features', 799.99, 50),
('Classic T-Shirt', 'Comfortable cotton t-shirt', 19.99, 200),
('Bestseller Novel', 'Award-winning fiction book', 24.99, 100),
('Garden Hose', 'Durable 50ft garden hose', 34.99, 75),
('Board Game Set', 'Family-friendly strategy game', 39.99, 60),
('Tennis Racket Pro', 'Professional-grade tennis racket', 129.99, 30),
('Organic Face Cream', 'Natural ingredients face moisturizer', 29.99, 150),
('Car Phone Mount', 'Adjustable car phone holder', 15.99, 100),
('Gourmet Coffee Beans', 'Premium roasted coffee beans', 12.99, 80),
('Dog Leash', 'Reflective dog leash for medium to large dogs', 18.99, 120),
('Wireless Earbuds', 'True wireless bluetooth earbuds', 89.99, 40),
('Yoga Mat', 'Non-slip exercise yoga mat', 25.99, 90);

-- Insert test data into product_categories junction table
INSERT INTO product_categories (product_id, category_id) VALUES
(1, 1), (1, 7), -- Smartphone in Electronics and Beauty & Personal Care
(2, 2), -- T-Shirt in Clothing
(3, 3), -- Novel in Books
(4, 4), -- Garden Hose in Home & Garden
(5, 5), -- Board Game in Toys & Games
(6, 6), -- Tennis Racket in Sports & Outdoors
(7, 7), -- Face Cream in Beauty & Personal Care
(8, 8), -- Car Phone Mount in Automotive
(9, 9), -- Coffee Beans in Food & Grocery
(10, 10), -- Dog Leash in Pet Supplies
(11, 1), (11, 6), -- Wireless Earbuds in Electronics and Sports & Outdoors
(12, 6), (12, 7); -- Yoga Mat in Sports & Outdoors and Beauty & Personal Care

-- Insert test data into product_images table
INSERT INTO product_images (product_id, image_url, is_primary) VALUES
(1, 'https://example.com/images/smartphone_x_main.jpg', true),
(1, 'https://example.com/images/smartphone_x_side.jpg', false),
(2, 'https://example.com/images/tshirt_front.jpg', true),
(2, 'https://example.com/images/tshirt_back.jpg', false),
(3, 'https://example.com/images/novel_cover.jpg', true),
(4, 'https://example.com/images/garden_hose.jpg', true),
(5, 'https://example.com/images/board_game.jpg', true),
(6, 'https://example.com/images/tennis_racket.jpg', true),
(7, 'https://example.com/images/face_cream.jpg', true),
(8, 'https://example.com/images/car_phone_mount.jpg', true),
(9, 'https://example.com/images/coffee_beans.jpg', true),
(10, 'https://example.com/images/dog_leash.jpg', true),
(11, 'https://example.com/images/wireless_earbuds.jpg', true),
(12, 'https://example.com/images/yoga_mat.jpg', true);

-- Insert test data into tags table
INSERT INTO tags (name) VALUES
('bestseller'), ('eco-friendly'), ('new-arrival'), ('sale'),
('organic'), ('wireless'), ('rechargeable'), ('waterproof'),
('handmade'), ('vegan'), ('gluten-free'), ('portable'),
('limited-edition'), ('gift-idea'), ('premium');

-- Insert test data into product_tags junction table
INSERT INTO product_tags (product_id, tag_id) VALUES
(1, 3), (1, 6), (1, 7), -- Smartphone: new-arrival, wireless, rechargeable
(2, 2), (2, 10), -- T-Shirt: eco-friendly, vegan
(3, 1), (3, 14), -- Novel: bestseller, gift-idea
(4, 8), (4, 12), -- Garden Hose: waterproof, portable
(5, 14), (5, 13), -- Board Game: gift-idea, limited-edition
(6, 15), (6, 12), -- Tennis Racket: premium, portable
(7, 5), (7, 10), -- Face Cream: organic, vegan
(8, 12), (8, 6), -- Car Phone Mount: portable, wireless
(9, 5), (9, 11), -- Coffee Beans: organic, gluten-free
(10, 8), (10, 2), -- Dog Leash: waterproof, eco-friendly
(11, 6), (11, 7), (11, 8), -- Wireless Earbuds: wireless, rechargeable, waterproof
(12, 2), (12, 12); -- Yoga Mat: eco-friendly, portable