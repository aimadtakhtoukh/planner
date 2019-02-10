pipeline {
  agent any

  stages {
    stage('directory clean') {
      steps {
        sh 'rm -rf *'
      }
    }

    stage('git pull') {
      steps {
        echo 'Pulling...'
        git url: 'https://github.com/aimadtakhtoukh/planner.git'
        dir('conf') {
          git credentialsId: 'Github', url: 'https://github.com/aimadtakhtoukh/planner-conf.git'
        }
        sh 'rm -rf conf/.git'
        sh 'cp -R conf/. .'
        sh 'rm -rf conf'
      }
    }

    stage('Front') {
      steps {
        dir('front') {
          sh 'npm install'
          sh 'npm run build'
          dir('node-app') {
            sh 'npm install'
          }
        }
      }
    }

    stage('Back') {
      steps {
        dir('back') {
          sh 'mvn clean install -Dmaven.test.skip=true'
        }
      }
    }

    stage('Docker build') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Docker stop') {
      steps {
        sh 'docker-compose down'
      }
    }

    stage('Docker start') {
      steps {
        sh 'docker-compose up -d'
      }
    }
  }
}