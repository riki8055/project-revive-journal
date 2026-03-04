export default function StepReview({ data }) {
  const { personal, education, experience } = data;

  return (
    <div>
      <h2>Review Your Application</h2>

      <section>
        <h3>Personal Information</h3>
        <p>First Name: {personal.firstName}</p>
        <p>Last Name: {personal.lastName}</p>
        <p>Email: {personal.email}</p>
      </section>

      <section>
        <h3>Education</h3>
        <p>Degree: {education.degree}</p>
        <p>University: {education.university}</p>
        <p>Year: {education.year}</p>
      </section>

      <section>
        <h3>Experience</h3>
        <p>Company: {experience.company}</p>
        <p>Role: {experience.role}</p>
        <p>Years: {experience.years}</p>
      </section>
    </div>
  );
}
