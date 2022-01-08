 def ImageName = "satyamk134/laundary-nodea-app"
 def Namespace = "default"
pipeline {
   
    agent any
	
    environment {
		DOCKERHUB_CREDENTIALS=credentials('docker-cred')
	}
    stages {
	 stage('Checkout'){
		 steps {
			 git 'https://github.com/satyamk134/forum-node.git'
		         sh "git rev-parse --short HEAD > .git/commit-id"
		         def imageTag= readFile('.git/commit-id').trim()
		 }
	}
        stage('build') {
            steps {
                sh 'docker build -t ${ImageName}:${imageTag} .'
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
				sh 'docker push ${ImageName}'
			}
		}
    }
}
