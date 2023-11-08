import React, { useState } from 'react';

interface IDataProps {
  title: string;
  value: string;
}

export const LabelInfoCard = ({title, value}:IDataProps):JSX.Element => {
  return (
    <div className="form-group row mb-2">
      <label className="col-sm-3 col-form-label fw-bold">{title}</label>
      <label className="col-sm-9 col-form-label">{value}</label>
    </div>
  );
}
