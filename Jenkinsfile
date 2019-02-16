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

    stage('Building Back') {
      steps {
        dir('back') {
          sh 'mvn clean install -e'
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