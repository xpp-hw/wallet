pipeline  {
    agent any

    environment {
        SIT_TARGETHOST = '172.18.107.2'
        SIT_APP_USER = 'nginx'
        APP_DEPLOY_DIR = '/app/nginx/front-msa/fintech-h5/'
        APP_DEPLOY_NAME = 'wallet'

        PRD_TARGETHOST = '172.18.107.1'
        PRD_APP_USER = 'prd-version'
        PRD_VER_DIR = 'frontend/wallet'
        PRD_VER_ZIP = 'dist/wallet_dist_*.zip'
    }

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Install') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 16.16.0') {
                     sh '''node -v
                     npm -v
                     npm install'''
                }
            }
        }
        stage('SitDeploy') {
            when {
                expression {
                     return env.JOB_NAME == 'frontend/wallet/sit'
                }
            }
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 16.16.0') {
                     sh '''npm install'''
                     sh '''npm run build:sit
                     rm -rf ${APP_DEPLOY_NAME}
                     mv dist ${APP_DEPLOY_NAME}
                     scp -r ${APP_DEPLOY_NAME} ${SIT_APP_USER}@${SIT_TARGETHOST}:${APP_DEPLOY_DIR}'''
                }
            }
        }

        stage('PrdDeploy') {
            when {
                expression {
                     return env.JOB_NAME == 'frontend/wallet/pre'

                }
            }
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 16.16.0') {
                     sh '''npm run buildtags --tags $tag'''
                     sh '''rsync -avz ${PRD_VER_ZIP} ${PRD_APP_USER}@${PRD_TARGETHOST}:~/${PRD_VER_DIR}/'''
                }
            }
        }
    }
}
