// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGraphcompute from '../../../app/controller/graphcompute';
import ExportNeo4j from '../../../app/controller/neo4j';
import ExportTugraph from '../../../app/controller/tugraph';

declare module 'egg' {
  interface IController {
    graphcompute: ExportGraphcompute;
    neo4j: ExportNeo4j;
    tugraph: ExportTugraph;
  }
}
