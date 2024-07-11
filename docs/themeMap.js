const themeMap = new Map();
themeMap.set('Home', new Map());
themeMap.get('Home').set('Index', 'Index');
themeMap.get('Home').set('Install', 'Installation tipps');
themeMap.get('Home').set('TestMyThing', 'Test some new feature');
themeMap.set('CodingFundamentals', new Map());
themeMap.get('CodingFundamentals').set('Variables', 'Variables');
themeMap.get('CodingFundamentals').set('DataTypes', 'Data Types');
themeMap.get('CodingFundamentals').set('ControlStructures', 'Control Structures');
themeMap.get('CodingFundamentals').set('Functions', 'Functions');
themeMap.get('CodingFundamentals').set('Recursion', 'Recursion');
themeMap.get('CodingFundamentals').set('Algorithms', 'Algorithms');
themeMap.get('CodingFundamentals').set('DataStructures', 'Data Structures');
themeMap.get('CodingFundamentals').set('OOP', 'Object-Oriented Programming');
themeMap.get('CodingFundamentals').set('FunctionalProgramming', 'Functional Programming');
themeMap.get('CodingFundamentals').set('ErrorHandling', 'Error Handling');
themeMap.set('FrontendDevelopment', new Map());
themeMap.get('FrontendDevelopment').set('HTML', 'HTML');
themeMap.get('FrontendDevelopment').set('CSS', 'CSS');
themeMap.get('FrontendDevelopment').set('JavaScript', 'JavaScript');
themeMap.get('FrontendDevelopment').set('ResponsiveDesign', 'Responsive Design');
themeMap.get('FrontendDevelopment').set('Accessibility', 'Accessibility');
themeMap.get('FrontendDevelopment').set('WebPerformance', 'Web Performance');
themeMap.get('FrontendDevelopment').set('BrowserCompatibility', 'Browser Compatibility');
themeMap.get('FrontendDevelopment').set('PWAs', 'Progressive Web Apps');
themeMap.get('FrontendDevelopment').set('WebAssembly', 'WebAssembly');
themeMap.get('FrontendDevelopment').set('WebComponents', 'Web Components');
themeMap.get('FrontendDevelopment').set('Deployment', 'Deploy on GitHub Pages');
themeMap.set('BackendDevelopment', new Map());
themeMap.get('BackendDevelopment').set('ServerSideLanguages', 'Server-Side Languages');
themeMap.get('BackendDevelopment').set('Databases', 'Databases');
themeMap.get('BackendDevelopment').set('RESTAPIs', 'RESTful APIs');
themeMap.get('BackendDevelopment').set('GraphQL', 'GraphQL');
themeMap.get('BackendDevelopment').set('Auth', 'Authentication & Authorization');
themeMap.get('BackendDevelopment').set('ServerManagement', 'Server Management');
themeMap.get('BackendDevelopment').set('WordPress', 'WordPress');
themeMap.set('FrameworksAndLibraries', new Map());
themeMap.get('FrameworksAndLibraries').set('React', 'React');
themeMap.get('FrameworksAndLibraries').set('Angular', 'Angular');
themeMap.get('FrameworksAndLibraries').set('Vue', 'Vue.js');
themeMap.get('FrameworksAndLibraries').set('NextJS', 'Next.js');
themeMap.get('FrameworksAndLibraries').set('Django', 'Django');
themeMap.get('FrameworksAndLibraries').set('Flask', 'Flask');
themeMap.get('FrameworksAndLibraries').set('ExpressJS', 'Express.js');
themeMap.get('FrameworksAndLibraries').set('SpringBoot', 'Spring Boot');
themeMap.get('FrameworksAndLibraries').set('Rails', 'Ruby on Rails');
themeMap.get('FrameworksAndLibraries').set('Laravel', 'Laravel');
themeMap.get('FrameworksAndLibraries').set('VersionControl', 'Version Control');
themeMap.get('FrameworksAndLibraries').set('CICD', 'CI/CD');
themeMap.get('FrameworksAndLibraries').set('Containerization', 'Containerization');
themeMap.get('FrameworksAndLibraries').set('Orchestration', 'Orchestration');
themeMap.get('FrameworksAndLibraries').set('IaC', 'Infrastructure as Code');
themeMap.get('FrameworksAndLibraries').set('Monitoring', 'Monitoring & Logging');
themeMap.get('FrameworksAndLibraries').set('CloudProviders', 'Cloud Providers');
themeMap.get('FrameworksAndLibraries').set('LoadBalancing', 'Load Balancing');
themeMap.get('FrameworksAndLibraries').set('NetworkSecurity', 'Network Security');
themeMap.get('FrameworksAndLibraries').set('BackupRecovery', 'Backup & Recovery');
themeMap.get('FrameworksAndLibraries').set('Webpack', 'Webpack');
themeMap.get('FrameworksAndLibraries').set('Tailwind', 'Tailwind CSS');
themeMap.set('DevOps', new Map());
themeMap.get('DevOps').set('CICD', 'CI/CD');
themeMap.get('DevOps').set('Containerization', 'Containerization');
themeMap.get('DevOps').set('Orchestration', 'Orchestration');
themeMap.get('DevOps').set('IaC', 'Infrastructure as Code');
themeMap.get('DevOps').set('Monitoring', 'Monitoring & Logging');
themeMap.get('DevOps').set('CloudProviders', 'Cloud Providers');
themeMap.get('DevOps').set('LoadBalancing', 'Load Balancing');
themeMap.get('DevOps').set('NetworkSecurity', 'Network Security');
themeMap.get('DevOps').set('BackupRecovery', 'Backup & Recovery');
themeMap.get('DevOps').set('DevSecOps', 'DevSecOps');
themeMap.set('QualityAssurance', new Map());
themeMap.get('QualityAssurance').set('UnitTesting', 'Unit Testing');
themeMap.get('QualityAssurance').set('IntegrationTesting', 'Integration Testing');
themeMap.get('QualityAssurance').set('E2ETesting', 'End-to-End Testing');
themeMap.get('QualityAssurance').set('TestAutomation', 'Test Automation');
themeMap.get('QualityAssurance').set('PerformanceTesting', 'Performance Testing');
themeMap.get('QualityAssurance').set('SecurityTesting', 'Security Testing');
themeMap.get('QualityAssurance').set('UsabilityTesting', 'Usability Testing');
themeMap.get('QualityAssurance').set('Debug', 'Debug');
themeMap.set('Security', new Map());
themeMap.get('Security').set('SecurityBestPractices', 'Security Best Practices');
themeMap.get('Security').set('OWASP', 'OWASP Top 10');
themeMap.get('Security').set('Cryptography', 'Cryptography');
themeMap.get('Security').set('SecureCoding', 'Secure Coding');
themeMap.get('Security').set('PenTesting', 'Penetration Testing');
themeMap.get('Security').set('VulnerabilityManagement', 'Vulnerability Management');
themeMap.get('Security').set('IAM', 'Identity & Access Management');
themeMap.get('Security').set('SecurityMonitoring', 'Security Monitoring');
themeMap.get('Security').set('IncidentResponse', 'Incident Response');
themeMap.get('Security').set('Compliance', 'Compliance & Regulations');
themeMap.set('MobileDevelopment', new Map());
themeMap.get('MobileDevelopment').set('Android', 'Android Development');
themeMap.get('MobileDevelopment').set('iOS', 'iOS Development');
themeMap.get('MobileDevelopment').set('CrossPlatform', 'Cross-Platform Development');
themeMap.get('MobileDevelopment').set('MobileUIUX', 'Mobile UI/UX');
themeMap.get('MobileDevelopment').set('MobilePerformance', 'Mobile Performance');
themeMap.get('MobileDevelopment').set('MobileSecurity', 'Mobile Security');
themeMap.get('MobileDevelopment').set('ASO', 'App Store Optimization');
themeMap.get('MobileDevelopment').set('PushNotifications', 'Push Notifications');
themeMap.get('MobileDevelopment').set('MobileDatabases', 'Mobile Databases');
themeMap.get('MobileDevelopment').set('MobileTesting', 'Mobile Testing');
themeMap.set('DataScienceAndML', new Map());
themeMap.get('DataScienceAndML').set('DataAnalysis', 'Data Analysis');
themeMap.get('DataScienceAndML').set('DataVisualization', 'Data Visualization');
themeMap.get('DataScienceAndML').set('StatisticalAnalysis', 'Statistical Analysis');
themeMap.get('DataScienceAndML').set('MLAlgorithms', 'Machine Learning Algorithms');
themeMap.get('DataScienceAndML').set('DeepLearning', 'Deep Learning');
themeMap.get('DataScienceAndML').set('NLP', 'Natural Language Processing');
themeMap.get('DataScienceAndML').set('DataCleaning', 'Data Cleaning');
themeMap.get('DataScienceAndML').set('BigData', 'Big Data Technologies');
themeMap.get('DataScienceAndML').set('ModelDeployment', 'Model Deployment');
themeMap.get('DataScienceAndML').set('AIEthics', 'AI Ethics');
themeMap.set('SoftSkills', new Map());
themeMap.get('SoftSkills').set('Communication', 'Communication');
themeMap.get('SoftSkills').set('Collaboration', 'Collaboration');
themeMap.get('SoftSkills').set('ProblemSolving', 'Problem-Solving');
themeMap.get('SoftSkills').set('TimeManagement', 'Time Management');
themeMap.get('SoftSkills').set('ProjectManagement', 'Project Management');
themeMap.get('SoftSkills').set('Agile', 'Agile Methodologies');
themeMap.get('SoftSkills').set('ContinuousLearning', 'Continuous Learning');
themeMap.get('SoftSkills').set('Leadership', 'Leadership');
themeMap.get('SoftSkills').set('Mentoring', 'Mentoring');
themeMap.get('SoftSkills').set('Networking', 'Networking');
themeMap.get('SoftSkills').set('Documentation', 'Update docs');
export default themeMap;
