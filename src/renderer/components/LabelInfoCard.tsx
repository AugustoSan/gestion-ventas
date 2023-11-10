import React, { useState } from 'react';

interface IDataProps {
  title: string;
  value: string;
}

export const LabelInfoCard = ({title, value}:IDataProps):JSX.Element => {
  return (
    <div className="form-group row mb-2">
      <label className="col-sm-4 col-form-label fw-bold">{title}</label>
      <label className="col-sm-8 col-form-label">{value}</label>
    </div>
  );
}
