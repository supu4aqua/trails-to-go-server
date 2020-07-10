-- SELECT * FROM "completed" LIMIT 1000;
-- leaderboard 1 - longest trails
SELECT DISTINCT(name),length FROM "completed" ORDER BY length DESC;

-- leaderboard 2 - most trails by user_id
SELECT COUNT(c.name) as completed, u.user_name 
    FROM "completed" as c 
    LEFT JOIN users as u
    ON c.user_id=u.id 
    GROUP BY u.user_name 
    ORDER BY completed DESC;

-- leaderboard 3 - total trail length by user_id

SELECT SUM(c.length) as length, u.user_name 
    FROM "completed" as c 
    LEFT JOIN users as u
    ON c.user_id=u.id 
    GROUP BY u.user_name 
    ORDER BY length DESC;