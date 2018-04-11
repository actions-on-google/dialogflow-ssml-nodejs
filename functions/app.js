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

const app = require('actions-on-google').dialogflow({debug: true});
const {completeResponses, examples} = require('./responses');

const welcome = (conv) => {
  conv.ask(completeResponses.welcome);
  conv.ask(completeResponses.examplesList);
};

const fallback = (conv) => {
  conv.ask(completeResponses.didNotUnderstand);
  conv.ask(completeResponses.examplesList);
};

const chooseExample = (conv, params) => {
  const element = params.element;
  if (!element) return fallback(conv);
  conv.ask(completeResponses.leadToExample(element));
  conv.ask(examples[element]);
};

app.intent('Welcome', welcome);
app.intent('Fallback', fallback);
app.intent('Choose Example', chooseExample);

module.exports = app;
