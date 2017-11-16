import * as _ from 'lodash';

let checkPrime = (num: number) => {
  for(let i: number = 2; i < num; ++i) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

let fib = (n) => {
  if (n < 2) {
    return 1;
  }
  return fib(n-1)+fib(n-2);
}

let responses: any = [
  [
    /what is your name/i,
    (match: any, msg: any) => {
      return 'enigma';
    }
  ],
  [
    /james bond in the film Dr No/i,
    (match: any, msg: any) => {
      return 'sean connery';
    }
  ],
  [
    /colour is a banana/i,
    (match: any, msg: any) => {
      return 'yellow';
    }
  ],
  [
    /eiffel tower in/i,
    (match: any, msg: any) => {
      return 'paris';
    }
  ],
  [
    /theresa may first elected/i,
    (match: any, msg: any) => {
      return '2016';
    }
  ],
  [
    /what is (.+) doing/i,
    (match: any, msg: any) => {
      return match[1] + ' is dead';
    }
  ],
  [
    /the sum of ([0-9]+) and ([0-9]+)$/i,
    (match: any, msg: any) => {
      return '' + (Number(match[1]) + Number(match[2]));
    }
  ],
  [
    /([0-9]+) plus ([0-9]+) plus ([0-9]+)$/i,
    (match: any, msg: any) => {
      return '' + (Number(match[1]) + Number(match[2]) + Number(match[3]));
    }
  ],
  [
    /([0-9]+) plus ([0-9]+)$/i,
    (match: any, msg: any) => {
      return '' + (Number(match[1]) + Number(match[2]));
    }
  ],
  [
    /([0-9]+) multiplied by ([0-9]+)$/i,
    (match: any, msg: any) => {
      return '' + (Number(match[1]) * Number(match[2]));
    }
  ],
  [
    /([0-9]+) divided by ([0-9]+)$/i,
    (match: any, msg: any) => {
      return '' + (Number(match[1]) / Number(match[2]));
    }
  ],
  [
    /([0-9]+) minus ([0-9]+)$/i,
    (match: any, msg: any) => {
      return '' + (Number(match[1]) - Number(match[2]));
    }
  ],
  [
    /([0-9]+) to the power of ([0-9]+)$/i,
    (match: any, msg: any) => {
      return '' + Math.pow(Number(match[1]), Number(match[2]));
    }
  ],
  [
    /the ([0-9]+)([a-z]+) number in the Fibonacci sequence$/i,
    (match: any, msg: any) => {
      return ''+fib(Number(match[1])-1);
    }
  ],
  [
    /numbers is the largest\: (.+)$/i,
    (match: any, msg: any) => {
      let array = match[1].split(',').map((x: any) => Number(x));
      return ''+Math.max(...array);
    }
  ],
  [
    /both a square and a cube\: (.+)$/i,
    (match: any, msg: any) => {
      let array = match[1].split(',')
        .map((x: any) => Number(x))
        .filter((n: any) => { return (Math.pow(n, 1/6) - Math.floor(Math.pow(n, 1/6))) === 0; });
      return ''+array.join(', ');
    }
  ],
  [
    /numbers are primes*\: (.+)$/i,
    (match: any, msg: any) => {
      let array = match[1].split(',')
        .map((x: any) => Number(x))
        .filter((n: any) => { return checkPrime(n); });
      return ''+array.join(', ');
    }
  ]
];

export function respondTo(query: string): string {
  if (!query) {
    return 'No query';
  }
  let question = (query.indexOf(':') !== -1 ? query.substring(query.indexOf(':')+1) : query).trim();
  console.log(question);
  let filteredResponses = responses.filter((row: any) => row[0].test(question));
  if (filteredResponses.length == 0) {
    return `Unknown query '${query}'`;
  }
  let response = filteredResponses[0];
  return response[1](response[0].exec(question), question);
}

