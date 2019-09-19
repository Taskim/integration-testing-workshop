.DEFAULT_GOAL: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m * %s\033[0m %s\n", $$1, $$2}'

DOCKER_EXEC := docker-compose -f docker-compose.yml

install: ## Install
	${DOCKER_EXEC} run --rm npm install

build: ## Build
	docker build -t integration-testing-workshop -f Dockerfile .

start: ## Start
	@$(DOCKER_EXEC) up -d --remove-orphans

stop: ## Stop
	${DOCKER_EXEC} down

test: ## Run tests
	${DOCKER_EXEC} exec node npm run test

test-coverage: ## Run tests coverage
	${DOCKER_EXEC} exec node npm run test:coverage

test-debug: ## Run tests
	${DOCKER_EXEC} exec node npm run test:debug

logs: ## Output logs of the container
	${DOCKER_EXEC} logs -f

shell: ## Shell
	${DOCKER_EXEC} exec node sh

.PHONY: install start stop test help logs build shell
