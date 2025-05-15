-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 09 mai 2025 à 02:05
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `restaurant`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Pizza'),
(2, 'Pasta'),
(3, 'Burgers'),
(4, 'Seafood'),
(5, 'Salads'),
(6, 'Vegan'),
(7, 'Barbecue'),
(8, 'Japanese'),
(9, 'Indian'),
(10, 'Mediterranean'),
(11, 'Sandwiches'),
(12, 'Thai'),
(13, 'French'),
(14, 'Sushi'),
(15, 'Fried'),
(16, 'Vegetarian'),
(17, 'British'),
(18, 'Middle Eastern'),
(19, 'Steak'),
(20, 'Mexican'),
(21, 'Breakfast'),
(22, 'Dessert');

-- --------------------------------------------------------

--
-- Structure de la table `chefs`
--

CREATE TABLE `chefs` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `specialization` varchar(255) NOT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `about` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `chefs`
--

INSERT INTO `chefs` (`id`, `fullname`, `specialization`, `pic`, `about`) VALUES
(1, 'Chef Mario', 'Italian Cuisine', NULL, 'Master of traditional Italian pizza and rustic flavors.'),
(2, 'Chef Luigi', 'Italian Pasta', NULL, 'Expert in creamy, savory pasta dishes with a modern twist.'),
(3, 'Chef John', 'American Burgers', NULL, 'Known for crafting juicy, flavorful burgers with gourmet toppings.'),
(4, 'Chef Anna', 'Seafood', NULL, 'Specializes in fresh, seasonal seafood with delicate sauces.'),
(5, 'Chef Emma', 'Salads and Dressings', NULL, 'Creates vibrant salads and unique homemade dressings.'),
(6, 'Chef Zoe', 'Vegan and Healthy', NULL, 'Focuses on plant-based, nutritious meals full of flavor.'),
(7, 'Chef Mark', 'Barbecue', NULL, 'Brings bold, smoky flavors to ribs and grilled favorites.'),
(8, 'Chef Leo', 'Japanese Fusion', NULL, 'Fuses traditional Japanese flavors with global influences.'),
(9, 'Chef Nora', 'Risotto and Grains', NULL, 'Loves creamy risottos and hearty grain-based dishes.'),
(10, 'Chef Aisha', 'Indian Cuisine', NULL, 'Brings authentic Indian spices to life with every dish.'),
(11, 'Chef Helen', 'Mediterranean Dishes', NULL, 'Combines bright, healthy Mediterranean ingredients in creative ways.'),
(12, 'Chef Rob', 'Sandwiches & Grilled Foods', NULL, 'Passionate about perfect sandwiches and fire-grilled creations.'),
(13, 'Chef Natt', 'Thai Cuisine', NULL, 'Combines bold Thai flavors with street-food authenticity.'),
(14, 'Chef Pierre', 'French Classics', NULL, 'French culinary artist known for elegant and comforting classics.'),
(15, 'Chef Sora', 'Sushi & Japanese Cuisine', NULL, 'Trained in Tokyo, with a deep love for fresh sushi and minimalist plating.'),
(16, 'Chef James', 'Southern Fried Foods', NULL, 'A southern soul who crafts crispy, golden perfection.'),
(17, 'Chef Carla', 'Italian Vegetarian', NULL, 'Marries classic Italian cooking with a vegetarian philosophy.'),
(18, 'Chef Ben', 'British Food', NULL, 'Proud of traditional British fare, elevated with modern flair.'),
(19, 'Chef Layla', 'Middle Eastern Cuisine', NULL, 'Inspired by rich spices and family recipes passed down for generations.'),
(20, 'Chef Hugo', 'French Bistro', NULL, 'Delivers hearty French comfort food with finesse.'),
(21, 'Chef Gina', 'Fresh Salads', NULL, 'Inventive with greens, grains, and global dressings.'),
(22, 'Chef Carlos', 'Mexican Cuisine', NULL, 'Brings bold, authentic Mexican flavors to every bowl.'),
(23, 'Chef Yuki', 'Japanese Noodle Dishes', NULL, 'A ramen specialist with experience in Tokyo noodle bars.'),
(24, 'Chef Lily', 'Breakfast & Brunch', NULL, 'Creates cozy and colorful morning meals to start your day right.'),
(25, 'Chef Oliver', 'Seafood Rolls', NULL, 'Crafts light, luxurious rolls with East Coast freshness.'),
(26, 'Chef Fabio', 'Italian Dumplings', NULL, 'Specialist in gnocchi and other northern Italian comfort foods.'),
(27, 'Chef Mei', 'Chinese Roasts', NULL, 'Excels at crispy, savory Chinese roasted meats and duck.'),
(28, 'Chef Omar', 'Stuffed Specialties', NULL, 'Loves experimenting with flavorful stuffed dishes from around the world.'),
(29, 'Chef Mia', 'Creamy Pastas', NULL, 'Combines silky sauces and rich textures in her signature pastas.'),
(30, 'Chef Theo', 'Desserts & Pastry', NULL, 'Creates rich desserts with molten centers and sweet perfection.');

-- --------------------------------------------------------

--
-- Structure de la table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text DEFAULT NULL,
  `reservation_id` int(11) DEFAULT NULL,
  `table_id` int(11) DEFAULT NULL,
  `uuid` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `address`, `reservation_id`, `table_id`) VALUES
(1, 'Alice Johnson', 'alice.johnson@example.com', '555-1234', '123 Maple Street, Springfield', NULL, NULL),
(2, 'Bob Smith', 'bob.smith@example.com', '555-5678', '456 Oak Avenue, Metropolis', NULL, NULL),
(3, 'Clara Davis', 'clara.davis@example.com', '555-8765', '789 Pine Road, Gotham', NULL, NULL),
(4, 'Daniel Lee', 'daniel.lee@example.com', '555-4321', '321 Birch Blvd, Star City', NULL, NULL),
(5, 'Emily Clark', 'emily.clark@example.com', '555-6789', '147 Cedar Lane, Central City', NULL, NULL),
(6, 'Frank Harris', 'frank.harris@example.com', '555-2468', '258 Aspen Drive, Coast City', NULL, NULL),
(7, 'Grace Kim', 'grace.kim@example.com', '555-1357', '369 Willow Way, Hill Valley', NULL, NULL),
(8, 'Henry Turner', 'henry.turner@example.com', '555-9753', '741 Elm Court, Riverdale', NULL, NULL),
(9, 'Isabel Moore', 'isabel.moore@example.com', '555-3141', '852 Cherry Street, Smallville', NULL, NULL),
(10, 'Jack Miller', 'jack.miller@example.com', '555-2460', '963 Poplar Place, Emerald City', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `user_role` varchar(50) DEFAULT NULL,
  `action_type` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `action_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `meals`
--

CREATE TABLE `meals` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `pic` varchar(255) NOT NULL,
  `chef_id` int(11) NOT NULL,
  `rating` float DEFAULT NULL,
  `popularity` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `meals`
--

INSERT INTO `meals` (`id`, `name`, `description`, `price`, `category_id`, `pic`, `chef_id`, `rating`, `popularity`) VALUES
(121, 'Margherita Pizza', 'Classic cheese and tomato pizza.', 9.99, 1, 'home-8-img-shop-1.jpg', 1, 4.2, 150),
(122, 'Spaghetti Carbonara', 'Creamy pasta with bacon and cheese.', 12.50, 2, 'home-8-img-shop-2.jpg', 2, 4.6, 120),
(123, 'Beef Burger', 'Juicy beef patty with fresh toppings.', 10.00, 3, 'home-8-img-shop-3.jpg', 3, 4.4, 200),
(124, 'Grilled Salmon', 'Salmon fillet with lemon butter sauce.', 15.99, 4, 'home-8-img-shop-4.jpg', 4, 4.7, 180),
(125, 'Chicken Caesar Salad', 'Crispy chicken with Caesar dressing.', 11.50, 5, 'home-8-img-shop-5.jpg', 5, 4.3, 140),
(126, 'Vegan Bowl', 'Healthy mix of grains, veggies and tofu.', 10.00, 6, 'home-8-img-shop-6.jpg', 6, 4.5, 110),
(127, 'BBQ Ribs', 'Tender pork ribs with BBQ glaze.', 14.99, 7, 'home-8-img-shop-7.jpg', 7, 4.6, 130),
(128, 'Tuna Tartare', 'Fresh tuna served with avocado and herbs.', 13.50, 4, 'home-8-img-shop-8.jpg', 8, 4.2, 90),
(129, 'Mushroom Risotto', 'Creamy risotto with wild mushrooms.', 12.00, 2, 'home-8-img-shop-9.jpg', 9, 4.3, 85),
(130, 'Chicken Tikka Masala', 'Indian spiced chicken in creamy sauce.', 13.00, 8, 'home-left-meni-img-2.jpg', 10, 4.7, 170),
(131, 'Greek Salad', 'Feta cheese, olives, tomatoes and cucumber.', 9.00, 5, 'home-left-meni-img-3.jpg', 11, 4, 100),
(132, 'Philly Cheesesteak', 'Steak sandwich with melted cheese.', 11.00, 9, 'inner-pages-img-11.jpg', 12, 4.4, 115),
(133, 'Shrimp Pad Thai', 'Thai stir-fried noodles with shrimp.', 12.50, 10, 'inner-pages-img-12.jpg', 13, 4.5, 135),
(134, 'French Onion Soup', 'Classic soup topped with melted cheese.', 8.00, 11, 'inner-pages-img-13.jpg', 14, 4.1, 75),
(135, 'Sushi Platter', 'Variety of fresh sushi rolls.', 17.99, 12, 'inner-pages-img-14.jpg', 15, 4.8, 190),
(136, 'Fried Chicken', 'Crispy southern style chicken.', 10.99, 7, 'main-img-5.jpg', 16, 4.3, 145),
(137, 'Eggplant Parmesan', 'Baked eggplant with marinara sauce.', 11.00, 13, 'pic22.jpg', 17, 4.2, 95),
(138, 'Fish & Chips', 'Fried fish with crispy fries.', 10.50, 4, 'shop-img-1.jpg', 18, 4.3, 160),
(139, 'Falafel Wrap', 'Chickpea balls in pita bread.', 8.99, 6, 'mar1.jpg', 19, 4.1, 100),
(140, 'Steak Frites', 'Grilled steak with French fries.', 16.50, 9, 'mar2.jpg', 20, 4.6, 175),
(141, 'Caprese Salad', 'Tomatoes, mozzarella and basil.', 9.50, 5, 'mar3.jpg', 21, 4, 90),
(142, 'Burrito Bowl', 'Mexican bowl with rice, beans and meat.', 10.75, 14, 'mar5.jpg', 22, 4.3, 130),
(143, 'Ramen', 'Japanese noodle soup with pork.', 12.00, 10, 'mar4.jpg', 23, 4.4, 155),
(144, 'Pancakes', 'Fluffy pancakes with maple syrup.', 7.99, 15, 'mar6.jpg', 24, 4.2, 125),
(145, 'Lobster Roll', 'Lobster meat in a toasted bun.', 18.99, 4, 'mar7.jpg', 25, 4.8, 160),
(146, 'Gnocchi', 'Potato dumplings with tomato sauce.', 11.50, 2, 'mar8.jpg', 26, 4.1, 80),
(147, 'Crispy Duck', 'Roasted duck with crispy skin.', 16.00, 9, 'mar9.jpg', 27, 4.7, 150),
(148, 'Stuffed Peppers', 'Bell peppers filled with rice & meat.', 10.00, 13, 'mar10.jpg', 28, 4.1, 95),
(149, 'Chicken Alfredo', 'Pasta with creamy Alfredo sauce.', 12.25, 2, 'mar11.jpg', 29, 4.5, 140),
(150, 'Chocolate Lava Cake', 'Warm cake with gooey chocolate center.', 6.99, 15, 'mar12.jpg', 30, 4.9, 200);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `reservation_id` int(11) DEFAULT NULL,
  `delivery_address` text DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_date`, `status`, `reservation_id`, `delivery_address`, `total_price`) VALUES
(1, 2, '2025-05-01 12:30:00', 'pending', 1, NULL, 150.00),
(2, 3, '2025-05-01 13:00:00', 'completed', NULL, '123 Main St', 85.50),
(3, 5, '2025-05-01 14:15:00', 'delivered', NULL, '456 Elm St', 92.00),
(4, 1, '2025-05-01 15:00:00', 'preparing', 2, NULL, 130.00),
(5, 4, '2025-05-01 16:00:00', 'canceled', NULL, '789 Oak St', 65.75),
(6, 2, '2025-05-02 11:30:00', 'completed', NULL, '101 Pine St', 120.00),
(7, 6, '2025-05-02 13:45:00', 'pending', 3, NULL, 175.00),
(8, 7, '2025-05-02 14:00:00', 'completed', NULL, '202 Maple Ave', 95.90),
(9, 8, '2025-05-02 17:00:00', 'delivered', NULL, '303 Cedar Blvd', 110.20),
(10, 3, '2025-05-03 12:00:00', 'pending', 4, NULL, 88.00),
(11, 9, '2025-05-03 14:00:00', 'completed', NULL, '404 Birch Rd', 70.00),
(12, 10, '2025-05-03 15:30:00', 'preparing', 5, NULL, 125.50),
(13, 1, '2025-05-03 16:45:00', 'pending', NULL, '505 Spruce Ln', 98.30),
(14, 4, '2025-05-04 10:30:00', 'completed', NULL, '606 Walnut St', 105.60),
(15, 5, '2025-05-04 13:00:00', 'delivered', NULL, '707 Poplar St', 115.20),
(42, 1, '2025-05-08 22:54:14', 'Delivered', 2, 'hhhhhhhhhhhhhhh', 80.60);

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `meal_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `meal_id`, `quantity`, `price`) VALUES
(35, 1, 121, 2, NULL),
(36, 1, 122, 1, NULL),
(37, 2, 130, 3, NULL),
(38, 2, 123, 1, NULL),
(39, 3, 133, 2, NULL),
(40, 3, 135, 1, NULL),
(41, 4, 124, 1, NULL),
(42, 4, 138, 2, NULL),
(43, 5, 143, 2, NULL),
(44, 5, 144, 3, NULL),
(45, 6, 125, 1, NULL),
(46, 6, 132, 2, NULL),
(47, 7, 145, 2, NULL),
(48, 7, 140, 1, NULL),
(49, 8, 127, 2, NULL),
(50, 8, 129, 2, NULL),
(51, 9, 137, 1, NULL),
(52, 9, 139, 1, NULL),
(53, 10, 136, 3, NULL),
(54, 10, 142, 2, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `reservation_time` datetime NOT NULL,
  `number_of_people` int(11) NOT NULL,
  `table_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id`, `reservation_time`, `number_of_people`, `table_id`) VALUES
(1, '2025-05-05 18:00:00', 2, 1),
(2, '2025-05-05 19:00:00', 4, 2),
(3, '2025-05-05 20:00:00', 4, 3),
(4, '2025-05-06 18:30:00', 6, 4),
(5, '2025-05-06 19:30:00', 8, 5),
(6, '2025-05-06 20:30:00', 10, 6),
(7, '2025-05-07 18:00:00', 2, 1),
(8, '2025-05-07 19:00:00', 3, 2),
(9, '2025-05-07 20:00:00', 5, 3),
(10, '2025-05-08 18:30:00', 6, 4),
(11, '2025-05-08 19:30:00', 8, 5),
(12, '2025-05-08 20:30:00', 10, 6),
(13, '2025-05-09 18:00:00', 2, NULL),
(14, '2025-05-09 19:00:00', 3, NULL),
(15, '2025-05-09 20:00:00', 5, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `rating` float DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tables`
--

CREATE TABLE `tables` (
  `id` int(11) NOT NULL,
  `table_number` int(11) NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `tables`
--

INSERT INTO `tables` (`id`, `table_number`, `capacity`) VALUES
(1, 1, 2),
(2, 2, 4),
(3, 3, 4),
(4, 4, 6),
(5, 5, 8),
(6, 6, 10);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `chefs`
--
ALTER TABLE `chefs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `reservation_id` (`reservation_id`),
  ADD KEY `table_id` (`table_id`);

--
-- Index pour la table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `chef_id` (`chef_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `reservation_id` (`reservation_id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `meal_id` (`meal_id`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `table_id` (`table_id`);

--
-- Index pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Index pour la table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `chefs`
--
ALTER TABLE `chefs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `meals`
--
ALTER TABLE `meals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `customers_ibfk_2` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `meals`
--
ALTER TABLE `meals`
  ADD CONSTRAINT `meals_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `meals_ibfk_2` FOREIGN KEY (`chef_id`) REFERENCES `chefs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
