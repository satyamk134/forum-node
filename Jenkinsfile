pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'docker build -t satyamk134/laundary-node-app .'
            }
        }
        stage('Test') {
            steps {
                echo "Testing"
            }
        }
    }
}
