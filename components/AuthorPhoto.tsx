export default function AuthorPhoto({ small = false }: { small?: boolean }) {
  return (
    <img
      src="/images/sd-singh-ratan.png"
      alt="S.D. Singh Ratan speaking into a microphone at a lectern"
      width="720"
      height="540"
      loading="lazy"
      className={small ? 'author-avatar' : 'teacher-photo'}
    />
  );
}
