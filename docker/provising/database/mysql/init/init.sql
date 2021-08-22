## create databases
CREATE DATABASE IF NOT EXISTS `tasks_management`;
CREATE DATABASE IF NOT EXISTS `tasks_management_tests`;

## create application user and grant rights
CREATE USER 'taskmanager'@'%' IDENTIFIED BY 'dGFza21hbmFnZXJwYXNzd29yZA==';
GRANT ALL ON tasks_management.* TO 'taskmanager'@'%';
GRANT ALL ON tasks_management_tests.* TO 'taskmanager'@'%';
