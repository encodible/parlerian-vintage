.PHONY: pipeline test docker.build docker.push k8s.deploy testa testb

save_progress:
	git add .
	git commit -m "${COMMIT_MSG}"

send_progress:
	git push
	git push --tags

build:
	npm run build-prod

docker.build:
	./build.sh -e prod dkb

docker.push:
	./build.sh -e prod dkp

k8s.deploy:
	kubectl apply -k k8s/base-prod

pipeline: COMMIT_MSG=${M}
pipeline: save_progress build docker.build docker.push k8s.deploy send_progress
