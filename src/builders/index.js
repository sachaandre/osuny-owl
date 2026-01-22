import * as blocks from './blocks/index.js';
import { 
  createPost,
  createProject, 
  composePost,
  addLocaleToPost,
  addLocaleToProject
} from './content.js';
import { slugify } from '../utils/slug.js';

export class OsunyUtility {
  static createTitle = blocks.createTitle;
  static createChapter = blocks.createChapter;
  static createDatatable = blocks.createDatatable;
  static createVideo = blocks.createVideo;
  static createImage = blocks.createImage;
  static createTimeline = blocks.createTimeline;
  static createPost = createPost;
  static createProject = createProject;
  static composePost = composePost;
  static addLocaleToPost = addLocaleToPost;
  static addLocaleToProject = addLocaleToProject;
  static slugify = slugify;
}