import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const coursesPage = new URL("../dist/courses/index.html", import.meta.url);
const servicesPage = new URL("../dist/services/index.html", import.meta.url);

test("courses and services render as separate commerce pages", async () => {
  const [coursesHtml, servicesHtml] = await Promise.all([
    readFile(coursesPage, "utf8"),
    readFile(servicesPage, "utf8"),
  ]);

  const courseCards = [...coursesHtml.matchAll(/class="premium-course-card premium-course-card--portrait"/g)];
  assert.equal(courseCards.length, 1, "courses page should focus on one premium course card");
  assert.match(coursesHtml, /class="catalog-section commerce-section course-focus-section course-focus-section--compact"/, "courses page should use the compact portrait course layout");
  assert.match(coursesHtml, /入门Ai编程实践课程/, "courses page should name the entry AI programming course");
  assert.match(coursesHtml, /入门Ai编程实践课程[\s\S]*1499元/, "course pricing should sit under the course name");
  assert.match(coursesHtml, /Coming Soon/, "course card should show the coming soon status");
  assert.doesNotMatch(coursesHtml, /B站更新/, "course card should not show the old Bilibili update status");
  assert.match(coursesHtml, /href="https:\/\/b23\.tv\/MRYVcxO"/, "course CTA should route to the Bilibili channel");
  assert.match(coursesHtml, /立即购买/, "course CTA should use purchase-oriented wording");
  assert.match(coursesHtml, /AI办公自动化/, "course scope should include AI office automation");
  assert.match(coursesHtml, /作图软件入门/, "course scope should include creative tool onboarding");
  assert.match(coursesHtml, /苹果 App 开发/, "course scope should include Apple app development");
  assert.match(coursesHtml, /市场分析/, "course scope should include market analysis");
  assert.match(coursesHtml, /商业调查/, "course scope should include business research");
  assert.match(coursesHtml, /开发实战/, "course scope should include practical development");
  assert.doesNotMatch(coursesHtml, /class="course-offer-card"/, "courses page should not render the old multi-card course grid");
  assert.doesNotMatch(coursesHtml, /预购买断价 1499 元/, "courses page should not show the old pre-order pricing label");
  assert.doesNotMatch(coursesHtml, /AI 企业落地顾问/, "courses page should not render service cards");

  assert.match(servicesHtml, /企业服务/, "services page should render the enterprise service heading");
  assert.doesNotMatch(servicesHtml, /class="commerce-kicker">Services/, "Chinese services page should not show the old English hero kicker");
  assert.doesNotMatch(servicesHtml, /class="course-hero-tags"/, "services page should not render hero scope tags");
  assert.match(servicesHtml, /企业 AI 战略与落地规划/, "services page should use professional enterprise service naming");
  assert.match(servicesHtml, /企业级 AI Agent 与自动化系统定制/, "services page should name custom agent work as an enterprise system service");
  assert.match(servicesHtml, /10w 起/, "services page should show enterprise pricing from 10w");
  assert.match(servicesHtml, /30w 起/, "services page should show high-end custom system pricing in w units");
  assert.doesNotMatch(servicesHtml, /\d{4} 元/, "services page should not show low four-digit RMB pricing");
  assert.doesNotMatch(servicesHtml, /1499 - 8999 元/, "services page should not show the old low service price range");
  assert.doesNotMatch(servicesHtml, /未来课程方向/, "services page should not render course cards");
});

test("header links service navigation to the standalone services page", async () => {
  const coursesHtml = await readFile(coursesPage, "utf8");

  assert.match(coursesHtml, /href="\/services"/, "header service link should point to /services");
  assert.match(coursesHtml, /企业服务/, "header service link should use the enterprise service label");
  assert.doesNotMatch(coursesHtml, /href="\/courses#services"/, "service link should not point to an in-page anchor");
});
