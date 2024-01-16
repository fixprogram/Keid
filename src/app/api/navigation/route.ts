// import { getServerUser } from "@/app/lib/getServerUser";
// import getUserProjectNames from "@/app/lib/data/user/getUserProjectNames";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const user = await getServerUser();

//   const userId = user.id;
//   const userProjectNames = await getUserProjectNames(userId);
//   const projectAmount = userProjectNames.length;

//   const data = {
//     projectAmount,
//     userProjectNames,
//     userId,
//     userName: user.name,
//   };

//   return NextResponse.json(data);
// }
