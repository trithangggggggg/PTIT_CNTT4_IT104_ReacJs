// promise

function getDataFormApi1() {
  return new Promise((res, reject) => {
    setTimeout(() => {
      console.log("lay du lieu tu api 1 thanh cong");
      res();
    }, 4000);
  });
}

function getDataFormApi2() {
  return new Promise((res, reject) => {
    setTimeout(() => {
      console.log("lay du lieu tu api 2 thanh cong");
      res();
    }, 4000);
  });
}

function getDataFormApi3() {
  return new Promise((res, reject) => {
    setTimeout(() => {
      console.log("lay du lieu tu api 3 thanh cong");
      res();
    }, 4000);
  });
}
 
async function runAllTask() {
//   getDataFormApi1()
//     .then(() => {
//       getDataFormApi2();
//     })
//     .then(() => {
//       getDataFormApi3();
//     })
//     // .then(() => {
//     //   console.log("tat ca chung m da bi t bao vay ");
//     // })
//     .catch((error) => {
//       console.log("looxi", error);
//     });


        try {
            await getDataFormApi1();
            await getDataFormApi2();
            await getDataFormApi3();
        } catch (error) {
            console.log("error", error);
            
        }
}

runAllTask();
