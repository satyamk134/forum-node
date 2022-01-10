 def ImageName = "satyamk134/laundary-node-app"
 def Namespace = "default"
 def imageTag = ""
pipeline {
    agent any
    environment {
		DOCKERHUB_CREDENTIALS=credentials('docker-cred')
	}
    stages {
	 stage('Checkout'){
		 steps {
			  script {
				 sh "git rev-parse --short HEAD > .git/commit-id"
				 imageTag = readFile(file:'.git/commit-id').trim()
			  }
		 }
	}
        stage('build') {
            steps {
		    sh "docker build -t ${ImageName}:${imageTag} ."
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
			sh "docker push ${ImageName}:${imageTag}"
		}
	}
	    stage('Invoke helm pipeline') {
		    steps {
			    build job: 'helm-chart-frontend', parameters: [string(name: 'dockertag', value: imageTag)]
		    }
	   }
    	}
	
	
} 
