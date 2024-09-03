-- online_shop_bootstrap.sql
-- USE FOR DEV
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS products_x_tags;
DROP TABLE IF EXISTS products_x_categories;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS tags;

-- Create the Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(200) UNIQUE,
    email VARCHAR(200) UNIQUE,
    password VARCHAR(200), -- Optional if users can register traditionally, can be NULL for social logins
    provider VARCHAR(25) DEFAULT 'local', -- 'local' for traditional signup, 'google' for Google login, etc.
    provider_id VARCHAR(255), -- Stores the ID provided by the OAuth provider (e.g., Google)
    status VARCHAR(20) DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
)

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    display_name VARCHAR(200),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
    html TEXT,
    barCode VARCHAR(255),
    qrCode VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create the Product_Category junction table for many-to-many relationship
CREATE TABLE products_x_categories (
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
CREATE TABLE products_x_tags (
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, tag_id)
);

-- Create indexes for better performance
-- CREATE INDEX idx_product_categories_product_id ON products_x_categories(product_id);
-- CREATE INDEX idx_product_categories_category_id ON products_x_categories(category_id);
-- CREATE INDEX idx_product_images_product_id ON product_images(product_id);
-- CREATE INDEX idx_product_tags_product_id ON products_x_tags(product_id);
-- CREATE INDEX idx_product_tags_tag_id ON products_x_tags(tag_id);

-- Create indexes for deleted_at columns
-- CREATE INDEX idx_categories_deleted_at ON categories(deleted_at);
-- CREATE INDEX idx_products_deleted_at ON products(deleted_at);
-- CREATE INDEX idx_product_images_deleted_at ON product_images(deleted_at);
-- CREATE INDEX idx_tags_deleted_at ON tags(deleted_at);

-- Insert data into categories table
INSERT INTO categories (name, description) VALUES 
('Electronics', 'All kinds of electronic items'),
('Clothing', 'Fashionable clothing and accessories'),
('Books', 'Wide range of books from various genres'),
('Home & Kitchen', 'Home appliances and kitchenware'),
('Sports', 'Sports equipment and apparel'),
('Toys', 'Toys and games for all ages'),
('Beauty', 'Beauty and personal care products'),
('Automotive', 'Automotive parts and accessories'),
('Health', 'Health and wellness products'),
('Music', 'Musical instruments and accessories'),
('Garden', 'Garden tools and supplies'),
('Jewelry', 'Jewelry and accessories'),
('Footwear', 'Footwear for men, women, and kids'),
('Office Supplies', 'Office equipment and supplies'),
('Groceries', 'Daily grocery items'),
('Pet Supplies', 'Supplies and food for pets'),
('Furniture', 'Furniture for home and office'),
('Stationery', 'Stationery products'),
('Hardware', 'Hardware tools and equipment'),
('Gaming', 'Video games and gaming accessories');

-- Insert data into products table
INSERT INTO products (name, description, html, barCode, qrCode, price, stock_quantity) VALUES 
('Smartphone', 'A high-quality smartphone', '<p>High-quality smartphone</p>', '1234567890123', 'QR123', 599.99, 100),
('Laptop', 'A powerful laptop', '<p>Powerful laptop for all your needs</p>', '2345678901234', 'QR124', 999.99, 50),
('Headphones', 'Noise-cancelling headphones', '<p>High-fidelity noise-cancelling headphones</p>', '3456789012345', 'QR125', 199.99, 200),
('T-Shirt', 'A comfortable cotton t-shirt', '<p>Comfortable cotton t-shirt</p>', '4567890123456', 'QR126', 19.99, 250),
('Jeans', 'Classic blue jeans', '<p>Classic blue jeans for everyday wear</p>', '5678901234567', 'QR127', 49.99, 150),
('Sneakers', 'Stylish sneakers', '<p>Comfortable and stylish sneakers</p>', '6789012345678', 'QR128', 79.99, 100),
('Cookbook', 'A comprehensive cookbook', '<p>Delicious recipes from around the world</p>', '7890123456789', 'QR129', 29.99, 300),
('Coffee Maker', 'Automatic coffee maker', '<p>Brew your perfect cup of coffee</p>', '8901234567890', 'QR130', 129.99, 75),
('Yoga Mat', 'Eco-friendly yoga mat', '<p>Durable and non-slip yoga mat</p>', '9012345678901', 'QR131', 39.99, 180),
('Football', 'Professional football', '<p>High-quality football for professionals</p>', '0123456789012', 'QR132', 49.99, 200),
('Action Figure', 'Collectible action figure', '<p>Detailed action figure for collectors</p>', '1123456789013', 'QR133', 24.99, 220),
('Lipstick', 'Long-lasting lipstick', '<p>Rich color and long-lasting wear</p>', '2123456789014', 'QR134', 14.99, 500),
('Car Battery', 'High-performance car battery', '<p>Reliable and long-lasting car battery</p>', '3123456789015', 'QR135', 129.99, 60),
('Vitamins', 'Daily multivitamins', '<p>Essential vitamins for daily health</p>', '4123456789016', 'QR136', 19.99, 400),
('Guitar', 'Acoustic guitar', '<p>High-quality acoustic guitar</p>', '5123456789017', 'QR137', 199.99, 50),
('Garden Shovel', 'Heavy-duty garden shovel', '<p>Durable shovel for all your gardening needs</p>', '6123456789018', 'QR138', 29.99, 100),
('Necklace', 'Gold-plated necklace', '<p>Elegant gold-plated necklace</p>', '7123456789019', 'QR139', 79.99, 120),
('Office Chair', 'Ergonomic office chair', '<p>Comfortable and adjustable office chair</p>', '8123456789020', 'QR140', 199.99, 40),
('Notebook', 'Hardcover notebook', '<p>Durable hardcover notebook</p>', '9123456789021', 'QR141', 9.99, 350),
('Hammer', 'Steel hammer', '<p>High-strength steel hammer</p>', '10123456789022', 'QR142', 19.99, 250),
('Gaming Console', 'Next-gen gaming console', '<p>Experience the future of gaming</p>', '11123456789023', 'QR143', 499.99, 80);

-- Insert data into products_x_categories table
INSERT INTO products_x_categories (product_id, category_id) VALUES 
(1, 1), (2, 1), (3, 1), -- Electronics
(4, 2), (5, 2), (6, 2), -- Clothing
(7, 3), -- Books
(8, 4), -- Home & Kitchen
(9, 5), (10, 5), -- Sports
(11, 6), -- Toys
(12, 7), -- Beauty
(13, 8), -- Automotive
(14, 9), -- Health
(15, 10), -- Music
(16, 11), -- Garden
(17, 12), -- Jewelry
(18, 13), -- Office Supplies
(19, 14), -- Stationery
(20, 15); -- Gaming

-- Insert data into product_images table
INSERT INTO product_images (product_id, image_url, is_primary) VALUES 
(1, 'https://picsum.photos/200', true), 
(2, 'https://picsum.photos/200', true), 
(3, 'https://picsum.photos/200', true),
(4, 'https://picsum.photos/200', true), 
(5, 'https://picsum.photos/200', true), 
(6, 'https://picsum.photos/200', true), 
(7, 'https://picsum.photos/200', true), 
(8, 'https://picsum.photos/200', true), 
(9, 'https://picsum.photos/200', true), 
(10, 'https://picsum.photos/200', true), 
(11, 'https://picsum.photos/200', true), 
(12, 'https://picsum.photos/200', true), 
(13, 'https://picsum.photos/200', true), 
(14, 'https://picsum.photos/200', true), 
(15, 'https://picsum.photos/200', true), 
(16, 'https://picsum.photos/200', true), 
(17, 'https://picsum.photos/200', true), 
(18, 'https://picsum.photos/200', true), 
(19, 'https://picsum.photos/200', true), 
(20, 'https://picsum.photos/200', true);

-- Insert data into tags table
INSERT INTO tags (name) VALUES 
('New Arrival'),
('Best Seller'),
('Limited Edition'),
('Discounted'),
('Popular'),
('Exclusive'),
('Trending'),
('Hot Deal'),
('Top Rated'),
('Editor’s Choice'),
('Customer Favorite'),
('Seasonal'),
('Featured'),
('Top Pick'),
('Special Offer'),
('Clearance'),
('Holiday Special'),
('Online Only'),
('Limited Stock'),
('Recommended');

-- Insert data into products_x_tags table
INSERT INTO products_x_tags (product_id, tag_id) VALUES 
(1, 1), (1, 2), (1, 3),
(2, 4), (2, 5), (2, 6),
(3, 7), (3, 8), (3, 9),
(4, 10), (4, 11), (4, 12),
(5, 13), (5, 14), (5, 15),
(6, 16), (6, 17), (6, 18),
(7, 19), (7, 20),
(8, 1), (8, 2),
(9, 3), (9, 4),
(10, 5), (10, 6),
(11, 7), (11, 8),
(12, 9), (12, 10),
(13, 11), (13, 12),
(14, 13), (14, 14),
(15, 15), (15, 16),
(16, 17), (16, 18),
(17, 19), (17, 20),
(18, 1), (18, 2),
(19, 3), (19, 4),
(20, 5), (20, 6);
