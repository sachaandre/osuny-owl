import * as blocks from './blocks/index.js';
import { createPost, createProject, composePost } from './content.js';
import { slugify } from '../utils/slug.js';

export class OsunyUtility {
  static createTitle = blocks.createTitle;
  static createChapter = blocks.createChapter;
  static createDatatable = blocks.createDatatable;
  static createVideo = blocks.createVideo;
  static createImage = blocks.createImage;
  static createPost = createPost;
  static createProject = createProject;
  static composePost = composePost;
  static slugify = slugify;
}