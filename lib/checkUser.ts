import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  const loggedInUser = await db.user.findUnique({
    where: { clerkId: user.id },
  });

  if (loggedInUser) {
    const needsUpdate =
      loggedInUser.imageUrl !== user.imageUrl ||
      loggedInUser.name !==
        `${user.firstName} ${user.lastName !== null ? user.lastName : ""}` ||
      loggedInUser.email !== user.emailAddresses[0]?.emailAddress;

    if (needsUpdate) {
      const updatedUser = await db.user.update({
        where: { clerkId: user.id },
        data: {
          name: `${user.firstName} ${
            user.lastName !== null ? user.lastName : ""
          }`,
          email: user.emailAddresses[0]?.emailAddress,
          imageUrl: user.imageUrl,
        },
      });
      return updatedUser;
    }

    return loggedInUser;
  }

  const newUser = await db.user.create({
    data: {
      clerkId: user.id,
      name: `${user.firstName} ${user.lastName !== null ? user.lastName : ""}`,
      email: user.emailAddresses[0]?.emailAddress,
      imageUrl: user.imageUrl,
    },
  });

  return newUser;
};
