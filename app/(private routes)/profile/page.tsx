import { getServerMe } from "@/lib/api/serverApi";
import css from "./Profile.module.css";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub | Profile",
  description:
    "Manage your NoteHab profile, update personal details, and customize your experience for seamless note-taking.",
  openGraph: {
    title: "NoteHub | Profile",
    description:
      "Manage your NoteHab profile, update personal details, and customize your experience for seamless note-taking.",
    url: "09-auth-kappa-seven.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub | Profile",
      },
    ],
  },
};

const Profile = async () => {
    const userData = await getServerMe();

return (
    <main className={css.mainContent}>
        <div className={css.profileCard}>
            <div className={css.header}>
                <h1 className={css.formTitle}>Profile Page</h1>
                <Link href="/profile/edit" className={css.editProfileButton}>
                Edit Profile
                </Link>
            </div>
            <div className={css.avatarWrapper}>
            <Image
                src={userData.avatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
            />
            </div>
            <div className={css.profileInfo}>
            <p>
                Username: {userData.username}
            </p>
            <p>
                Email: {userData.email}
            </p>
            </div>
        </div>
    </main>
    )
}

export default Profile;