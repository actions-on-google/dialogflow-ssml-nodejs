// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Sanitize template literal inputs by escaping characters into XML entities
 * to use in SSML
 * Also normalize the extra spacing for better text rendering in SSML
 * A tag function used by ES6 tagged template literals
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
 *    /Template_literals#Tagged_template_literals
 *
 * @example
 * const equation = '"1 + 1 > 1"';
 * const response = ssml`
 *   <speak>
 *     ${equation}
 *   </speak>
 * `;
 * // Equivalent to ssml`\n  <speak>\n    ${equation}\n  </speak>\n`
 * console.log(response);
 *
 * Prints:
 * `<speak>
 *   &quot;1 + 1 &gt; 1&quot;
 * </speak>`
 * Equivalent to
 * '<speak>\n  &quot;1 + 1 &gt; 1&quot;\n</speak>'
 *
 * @param {TemplateStringsArray} template
 *    Non sanitized constant strings in the template literal
 * @param {Array<string>} inputs
 *    Computed expressions to be sanitized surrounded by ${}
 * @return {string}
 */
const ssml = (template, ...inputs) => {
  // Generate the raw escaped string
  const raw = template.reduce((out, str, i) => i
    ? out + (
      inputs[i - 1]
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
    ) + str
    : str
  );
  // Trim out new lines at the start and end but keep indentation
  const trimmed = raw
    .replace(/^\s*\n(\s*)<speak>/, '$1<speak>')
    .replace(/<\/speak>\s+$/, '</speak>');
  // Remove extra indentation
  const lines = trimmed.split('\n');
  const indent = /^\s*/.exec(lines[0])[0];
  const match = new RegExp(`^${indent}`);
  return lines.map((line) => line.replace(match, '')).join('\n');
};

module.exports = {ssml};
