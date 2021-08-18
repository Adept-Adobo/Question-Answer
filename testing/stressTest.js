import http from 'k6/http';
import {check, sleep} from 'k6';

//10 request per second

export const options = {
  stages: [
    { duration: '20s', target: 10 },
    { duration: '30s', target: 10},
    { duration: '1m', target: 10},
    { duration: '1m30s', target: 20},
    { duration: '30s', target: 10},
    { duration: '10s', target: 10},
  ],
};

export default function() {
  // const randomPageNumber = Math.floor(Math.random() * 100);
  // const randomCountNumber = Math.floor(Math.random() * 100);
  const randomProductId = Math.floor(Math.random() * 5000);

  const getQuestions = http.get(`http://localhost:3000/qa/questions/${randomProductId}`)
  check(getQuestions, {'status was 200': (r) => r.status === 200 });
  // what does this mean
  sleep(1)

  // const url = `http://localhost/qa/questions/:product_id`
  // const questionData = JSON.stringify({

  // })

  // http.post(url, questionData);
}
