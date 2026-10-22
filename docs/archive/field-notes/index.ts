import { checkAiAnswers } from './check-ai-answers';
import { fivePartBrief } from './five-part-brief';
import { propertyAiTasks } from './property-ai-tasks';
import { whatNotToPaste } from './what-not-to-paste';
import type { Article } from './types';

export type { Article, Block } from './types';
export const articles: Article[] = [fivePartBrief, checkAiAnswers, propertyAiTasks, whatNotToPaste].sort((a, b) => b.published.localeCompare(a.published));
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
