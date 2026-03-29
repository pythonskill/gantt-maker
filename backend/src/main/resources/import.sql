-- Insert sample tasks
INSERT INTO jira_tasks (id, summary, start_date, duration, progress, parent_id, status, assignee, priority, story_points, created_date, updated_date) 
VALUES 
(1, 'Project Kickoff', '2024-01-15 09:00:00', 1, 1.0, NULL, 'Done', 'john.doe', 'High', 2, NOW(), NOW()),
(2, 'Requirements Gathering', '2024-01-16 09:00:00', 3, 0.8, NULL, 'In Progress', 'jane.smith', 'High', 5, NOW(), NOW()),
(3, 'Design Phase', '2024-01-19 09:00:00', 5, 0.5, NULL, 'In Progress', 'bob.wilson', 'Medium', 8, NOW(), NOW()),
(4, 'Frontend Development', '2024-01-24 09:00:00', 10, 0.3, 3, 'In Progress', 'alice.johnson', 'High', 13, NOW(), NOW()),
(5, 'Backend Development', '2024-01-24 09:00:00', 12, 0.4, 3, 'In Progress', 'charlie.brown', 'Critical', 13, NOW(), NOW()),
(6, 'API Integration', '2024-02-03 09:00:00', 4, 0.0, 3, 'To Do', 'diana.prince', 'Medium', 5, NOW(), NOW()),
(7, 'Testing', '2024-02-07 09:00:00', 5, 0.0, NULL, 'To Do', 'eve.adams', 'Medium', 8, NOW(), NOW()),
(8, 'Deployment', '2024-02-12 09:00:00', 2, 0.0, NULL, 'To Do', 'frank.castle', 'High', 3, NOW(), NOW());

-- Reset sequence
ALTER TABLE jira_tasks ALTER COLUMN id RESTART WITH 9;

-- Insert sample links (dependencies)
INSERT INTO jira_links (source_id, target_id, type) 
VALUES 
(1, 2, 'finish-to-start'),
(2, 3, 'finish-to-start'),
(3, 4, 'finish-to-start'),
(3, 5, 'finish-to-start'),
(4, 6, 'finish-to-start'),
(5, 6, 'finish-to-start'),
(6, 7, 'finish-to-start'),
(7, 8, 'finish-to-start');