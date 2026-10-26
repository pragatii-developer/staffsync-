import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTrainingProgram, toggleTrainingEnroll } from '../store/hrmSlice';

const TrainingPage = () => {
  const { trainings } = useSelector((state) => state.hrm);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [department, setDepartment] = useState('Engineering');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !instructor) return;
    dispatch(
      addTrainingProgram({
        title,
        instructor,
        department,
        startDate: '2026-11-20',
        durationHours: 12,
        status: 'Upcoming'
      })
    );
    setTitle('');
    setInstructor('');
  };

  return (
    <div>
      <div className="mb-3">
        <h3 className="fw-bold mb-1">Training & Skill Development Programs</h3>
        <p className="opacity-75 mb-0">Access upskilling modules, track completion rates, and launch new team training cohorts.</p>
      </div>

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="ui-card">
            <h5 className="fw-bold mb-3">Launch New Training Cohort</h5>
            <form onSubmit={handleAdd}>
              <div className="mb-2">
                <label className="small fw-semibold">Program Title</label>
                <input className="form-control" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Cloud Native Node.js" />
              </div>
              <div className="mb-2">
                <label className="small fw-semibold">Lead Instructor</label>
                <input className="form-control" required value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="e.g. Rohan Kulkarni" />
              </div>
              <div className="mb-3">
                <label className="small fw-semibold">Target Department</label>
                <select className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option>Engineering</option>
                  <option>Product Design</option>
                  <option>All</option>
                </select>
              </div>
              <button type="submit" className="btn-brand w-100">+ Create Training Program</button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="row g-3">
            {trainings.map((trn) => (
              <div className="col-md-6" key={trn._id}>
                <div className="ui-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-info text-dark">{trn.department}</span>
                      <span className="small opacity-75">{trn.durationHours} Hours</span>
                    </div>
                    <h5 className="fw-bold">{trn.title}</h5>
                    <p className="small opacity-75 mb-2">Instructor: <strong>{trn.instructor}</strong> · Starts: {trn.startDate}</p>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between small mb-1">
                      <span>Completion Progress</span>
                      <span className="fw-bold">{trn.completionRate}%</span>
                    </div>
                    <div className="progress mb-3" style={{ height: '7px' }}>
                      <div className="progress-bar bg-success" style={{ width: `${trn.completionRate}%` }} />
                    </div>
                    <button
                      onClick={() => dispatch(toggleTrainingEnroll(trn._id))}
                      className={`btn btn-sm w-100 ${trn.enrolled ? 'btn-outline-success' : 'btn-brand'}`}
                    >
                      {trn.enrolled ? '✓ Enrolled (Click to Unenroll)' : 'Enroll in Program'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
