-- migrate:up
INSERT INTO stacks (name, image, classification) VALUES 
('JavaScript', 'https://holaworld.io/images/languages/javascript.svg', 'front'),
('TypeScript', 'https://holaworld.io/images/languages/typescript.svg', 'front'),
('React', 'https://holaworld.io/images/languages/react.svg', 'front'),
('Vue', 'https://holaworld.io/images/languages/vue.svg', 'front'),
('Svelte', 'https://holaworld.io/images/languages/svelte.svg', 'front'),
('Nextjs', 'https://holaworld.io/images/languages/nextjs.svg', 'front'), -- 프론트

('Nodejs', 'https://holaworld.io/images/languages/nodejs.svg', 'back'),
('Java', 'https://holaworld.io/images/languages/java.svg', 'back'),
('Spring', 'https://holaworld.io/images/languages/spring.svg', 'back'),
('Go', 'https://holaworld.io/images/languages/go.svg', 'back'),
('Nestjs', 'https://holaworld.io/images/languages/nestjs.svg', 'back'),
('Kotlin', 'https://holaworld.io/images/languages/kotlin.svg', 'back,mobile'),
('Express', 'https://holaworld.io/images/languages/express.svg', 'back'),
('MySQL', 'https://holaworld.io/images/languages/mysql.svg', 'back'),
('MongoDB', 'https://holaworld.io/images/languages/mongodb.svg', 'back'),
('Python', 'https://holaworld.io/images/languages/python.svg', 'back'),
('Django', 'https://holaworld.io/images/languages/django.svg', 'back'),
('php', 'https://holaworld.io/images/languages/php.svg', 'back'),
('GraphQL', 'https://holaworld.io/images/languages/graphql.svg', 'back'),
('Firebase', 'https://holaworld.io/images/languages/firebase.svg', 'back'), -- 백

('Flutter', 'https://holaworld.io/images/languages/flutter.svg', 'mobile'),
('Swift', 'https://holaworld.io/images/languages/swift.svg', 'mobile'),
('ReactNative', 'https://holaworld.io/images/languages/reactnative.svg', 'mobile'),
('Unity', 'https://holaworld.io/images/languages/unity.svg', 'mobile'), -- 모바일 

('AWS', 'https://holaworld.io/images/languages/aws.svg', 'ect'),
('Kubernetes', 'https://holaworld.io/images/languages/kubernetes.svg', 'ect'),
('Docker', 'https://holaworld.io/images/languages/docker.svg', 'ect'),
('Git', 'https://holaworld.io/images/languages/git.svg', 'ect'),
('Figma', 'https://holaworld.io/images/languages/figma.svg', 'ect'),
('Zeplin', 'https://holaworld.io/images/languages/zeplin.svg', 'ect'),
('Jest', 'https://holaworld.io/images/languages/jest.svg', 'ect'); -- 기타

-- migrate:down
DELETE FROM stacks;

