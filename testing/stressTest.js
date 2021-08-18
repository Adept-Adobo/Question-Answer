import http from 'k6/http';
import {check, sleep} from 'k6';

//10 request per second

export const options = {
  stages: [
    { duration: '20s', target: 10 },
    { duration: '30s', target: 200 },
    { duration: '1m', target: 1000 },
    { duration: '1m30s', target: 2000 },
    { duration: '30s', target: 500 },
    { duration: '10s', target: 100 },
  ],
};

export default function() {
  const randomProductId = Math.floor(Math.random() * 5000);

  const getQuestions = http.get(`http://localhost:3000/qa/questions/${randomProductId}`);
  check(getQuestions, { 'status was 200': (r) => r.status === 200 });
  // what does this mean
  sleep(1);

  // const url = `http://localhost/qa/questions/:product_id`
  // const questionData = JSON.stringify({

  // })

  // http.post(url, questionData);
}
