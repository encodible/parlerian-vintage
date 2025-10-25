#!/usr/bin/env bash
# Deploy Control Script

DATALAB_IMAGE_NAME="data-lab"
LANDING_IMAGE_NAME="public-website"
GOOGLE_PROJECT_ID="veti-prod"
REGISTRY_HOST="gcr.io"
VERSION=$(git describe --abbrev=0)
DATALAB_TAG_NAME=${REGISTRY_HOST}/${GOOGLE_PROJECT_ID}/${DATALAB_IMAGE_NAME}
LANDING_TAG_NAME=${REGISTRY_HOST}/${GOOGLE_PROJECT_ID}/${LANDING_IMAGE_NAME}
ENV="dev"

printUsage() {
    echo "Valid commands: [ ngb | dkb | dkp | up | down | logs | save | scp | load | clean | refresh ]"
}

while getopts ":e:f:" opt; do
  case ${opt} in
    e)
      ENV=$OPTARG
      ;;
    \?)
      echo "invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

shift $(($OPTIND -1))

if [ -z "$1" ]; then
	echo "Must send in command to use ${0}"
	printUsage
	exit 0
else
    COMMAND=$1
fi

buildBinaries() {
    npm run build-prod --build-optimizer
}

buildDockerImages() {
  echo "env ${ENV}"
  docker build -t ${DATALAB_TAG_NAME}:"${VERSION}" -f docker/datalab/Dockerfile .
  docker build -t ${DATALAB_TAG_NAME}:latest -f docker/datalab/Dockerfile .
  docker build -t ${LANDING_TAG_NAME}:"${VERSION}" -f docker/publicwebsite/Dockerfile .
  docker build -t ${LANDING_TAG_NAME}:latest -f docker/publicwebsite/Dockerfile .
}

pushDockerImages() {
    docker push ${DATALAB_TAG_NAME}:"${VERSION}"
    docker push ${DATALAB_TAG_NAME}:latest
    docker push ${LANDING_TAG_NAME}:"${VERSION}"
    docker push ${LANDING_TAG_NAME}:latest
}


case ${COMMAND} in
  ngb|ng-build                  ) buildBinaries ;;
  dkb|docker-build|DOCKER-BUILD ) buildDockerImages ;;
  dkp|docker-push|DOCKER-PUSH   ) pushDockerImages ;;
  *)
    printUsage
    exit 1
esac

exit 0
