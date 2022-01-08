pipeline {
    agent any
    environment {
		DOCKERHUB_CREDENTIALS=credentials('docker-cred')
	}
    stages {
        stage('build') {
            steps {
                sh 'docker build -t satyamk134/laundary-node-app-for-fun .'
            }
        }
        stage('Test') {
            steps {
                echo "Testing" 
            }
        }
        
        stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push satyamk134/laundary-node-app-for-fun:latest'
			}
		}
    }
}
