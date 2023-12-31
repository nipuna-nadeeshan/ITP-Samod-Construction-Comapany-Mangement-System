import React from "react";
import { useState } from "react";
import axios from "axios";
import storage from "../../../Apis/firebase.config.js"
import { ref } from "firebase/storage";
import {
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { useNavigate } from "react-router-dom";


export default function AddEmployee(onAddEmployee) {

  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nic, setNic] = useState("");
  const [hiredDate, setHiredDate] = useState("");
  const [gender, setGender] = useState("male");
  const [method, setMethod] = useState("monthly");
  const [salary, setSalary] = useState(0);
  const [file, setFile] = useState('https://www.w3schools.com/howto/img_avatar.pn')
  const [percent, setPercent] = useState(0);

  function handleUpload() {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }

    // Validate name field
    if (!name) {
      alert('Name is required');
      return;
    }

    // Validate phone field
    if (!phone || phone.length !== 10) {
      alert('Phone number is required with 10 digits');
      return;
    } else if (!/^[0-9+]+$/.test(phone)) {
      alert('Phone number can only contain numbers and the "+" symbol');
      return;
    }
    // Validate NIC field
    if (!nic) {
      alert('NIC is required');
      return;
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            console.log(url);
            axios
              .post("http://localhost:5000/employee/add", {
                name: name,
                phone: phone,
                nic: nic,
                isMonthly: method === "monthly",
                salary: salary,
                gender: gender,
                image: url,
              })
              .then((response) => {
                console.log(response.data);
                alert("Employee Added Successfully");
                navigate("/admin/HR/viewemployee");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            alert("Something went wrong. Please fill the form correctly!");
          });
      }
    );
  }


  // const handlePhoneChange = (e) => {
  //   const input = e.target.value;
  //   const sanitizedInput = input.replace(/\D/g, ''); // Remove non-digit characters
  //   const formattedInput = sanitizedInput.slice(0, 10); // Limit to 10 digits

  //   if (formattedInput.length == 10) {
  //     setPhone(formattedInput);
  //   } else {
  //     setPhone(''); // Reset phone number if not 10 digits
  //   }
  // };

  return (
    <div className="w-full overflow-hidden overflow-y-auto mb-10" style={{ height: 450 }}>

      <div className="relative flex flex-col justify-center overflow-hidden p-10 m-10">
        <div className="m-auto h-fit w-2/3 rounded-md bg-white p-6 shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
          <h1 className="text-center text-3xl font-semibold text-gray-700">
            Add Employee
          </h1>
          <br></br>

          <div className="relative mb-3">
            <input onChange={(e) => {
              setName(e.target.value);
            }}
              defaultValue={name}
              type="text"
              className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-basicBlue  dark:text-neutral-500 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="floatingInput"
              placeholder=" "
            />

            <label
              htmlFor="floatingInput"
              className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-primary transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-basicBlue  dark:peer-focus:text-primary"
            >
              Full Name
            </label>
          </div>



          <div className="relative mb-3">
            <input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              //             onKeyPress={(e) => {
              //               if (!/\d|\./.test(e.key)) {
              //                 e.preventDefault();
              //               }
              //             }}
              // onChange={handlePhoneChange}


              type="tel"
              pattern="[0-9+]+"
              maxLength="10"
              value={phone}
              
              className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-basicBlue  dark:text-neutral-500 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="floatingInput"
              placeholder=" "
            />
            <label
              htmlFor="floatingInput"
              className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-primary transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-basicBlue  dark:peer-focus:text-primary"
            >
              Mobile Number{" "}
            </label>
          </div>

          <div className="relative mb-3 flex flex-col gap-3">
            <div className="flex gap-4">
              <input
                type="radio"
                name="Gender"
                id="male"
                className="radio radio-warning"
                defaultChecked={gender == "male"}
                onClick={(e) => {
                  if (e.target.checked) {
                    setGender("male")
                  }
                }}
              />
              <label htmlFor="male" className="cursor-pointer">
                Male
              </label>
            </div>

            <div className="flex gap-4">
              <input
                type="radio"
                id="female"
                name="Gender"
                className="radio radio-warning"
                defaultChecked={gender == "female"}
                onClick={(e) => {
                  if (e.target.checked) {
                    if (e.target.checked) {
                      setGender("female")
                    }
                  }
                }
                }
              />
              <label htmlFor="female" className="cursor-pointer">
                Female
              </label>
            </div>
          </div>

          <div className="relative mb-3">
            <input
              onChange={(e) => {
                setNic(e.target.value);
              }}
              type="text"
              className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-basicBlue  dark:text-neutral-500 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="floatingInput"
              placeholder=" "
            />
            <label
              htmlFor="floatingInput"
              className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-primary transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-basicBlue  dark:peer-focus:text-primary"
            >
              NIC No{" "}
            </label>
          </div>
          <div className="relative mb-3 flex flex-col gap-3">
            <div className="flex gap-4">
              <input
                type="radio"
                name="method"
                id="method"
                className="radio radio-warning"
                defaultChecked={method == "monthly"}
                onClick={(e) => {
                  if (e.target.checked) {
                    setMethod("monthly")
                  }
                }}
              />
              <label htmlFor="male" className="cursor-pointer">
                Monthly
              </label>
            </div>

            <div className="flex gap-4">
              <input
                type="radio"
                id="method"
                name="method"
                className="radio radio-warning"
                defaultChecked={method == "daily"}
                onClick={(e) => {
                  if (e.target.checked) {
                    if (e.target.checked) {
                      setMethod("daily")
                    }
                  }
                }
                }
              />
              <label htmlFor="female" className="cursor-pointer">
                Daily
              </label>
            </div>
          </div>
          <div className="relative mb-3">
            <input
              type="number"
              onChange={(e) => {
                setSalary(e.target.value);

              }}
                   //             onKeyPress={(e) => {
          //               if (!/\d|\./.test(e.key)) {
          //                 e.preventDefault();
          //               }
          //             }}
            
              defaultValue={salary}
              className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-basicBlue  dark:text-neutral-500 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
              id="floatingInput"
              placeholder=" "
            />
            <label
              htmlFor="floatingInput"
              className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-primary transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-basicBlue  dark:peer-focus:text-primary"
            >
              Salary{" "}

            </label>
          </div>
          <br></br>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload Profile Photo</label>
          <input type="file" className="file-input file-input-xs file-input-bordered file-input-error w-[90%]" onChange={(e)=>{
            setFile(e.target.files[0]);
          }}
          //             onKeyPress={(e) => {
          //               if (!/\d|\./.test(e.key)) {
          //                 e.preventDefault();
          //               }
          //             }}
          />
          <div>
            <br></br>

            <button className="h-8 btn btn-fill btn-warning w-full text-white text-xl tracking-widest "
              onClick={
                () => {
                  handleUpload()
                }

              }>

              Add Employee
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
