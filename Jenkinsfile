pipeline {
    agent any
        stages {
            
           stage('Cloning Git') {
                steps {
                   git 'https://github.com/opensourcelinux/nodejs-vsearch'
                }
            }
              
            stage('Build') {
                steps {
                    echo 'This is the Build Stage'
                }
            }
            stage('Test') {
                steps {
                    echo 'This is the Testing Stage'
                }
            }
            stage('Deploy') {
                steps {
                    echo 'This is the Deploy Stage'
                }
            }
        }
    }
