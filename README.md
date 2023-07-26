# Gamificated BPMN Engine

This repository contains a gamified implementation of a BPMN (Business Process Model and Notation) engine. It is built using React and TypeScript.

## Overview

The main entry point of the application is `src/App.tsx`, which sets up the React application and includes the main components.

The application's core functionality is encapsulated in the `Engine` component (`src/components/Engine.tsx`), which manages the game engine's state and behavior.

The structure of a BPMN process is represented using the `Bpmn` model (`src/model/Bpmn.ts`).

## Nodes

The application includes several types of nodes, each represented by a class:

- `ActivityNode` (`src/nodes/ActivityNode.ts`): Represents an activity node in the BPMN process.
- `ChallengeNode` (`src/nodes/ChallengeNode.ts`): Represents a challenge node in the BPMN process.
- `EndNode` (`src/nodes/EndNode.ts`): Represents an end node in the BPMN process.
- `GatewayNode` (`src/nodes/GatewayNode.ts`): Represents a gateway node in the BPMN process.
- `GamificationEventNode` (`src/nodes/GamificationEventNode.ts`): Represents a gamification event node in the BPMN process.
- `InfoNode` (`src/nodes/InfoNode.ts`): Represents an info node in the BPMN process.
- `StartNode` (`src/nodes/StartNode.ts`): Represents a start node in the BPMN process.

## State Management

The state of the BPMN process is managed using the `flowStore` (`src/stores/flowStore.ts`).

## Utilities

The application includes utility functions for importing and parsing BPMN files (`src/util/Importer.ts` and `src/util/Parser.ts`).

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/MertenD/gamificated-bpmn-engine.git
cd gamificated-bpmn-engine
npm install
```

Then, you can start the application:

```bash
npm start
```

The application will be available at http://localhost:3000.

