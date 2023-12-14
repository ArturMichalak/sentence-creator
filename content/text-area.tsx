"use client";

import { Input } from 'antd';
import classNames from 'classnames';
import { Control, Controller, FieldError } from 'react-hook-form';
import { FaCircleCheck } from 'react-icons/fa6';

const { TextArea: AntdTextArea } = Input;

interface TextAreaProps {
  answer?: string;
  error?: FieldError;
  control: Control<{answer: string}>
}

export default function TextArea({ answer, error, control }: TextAreaProps) {
  if (!answer) return null;
  return (
    <div
      className={classNames("flex gap-4", error && "text-red-700")}
    >
      <Controller
        name="answer"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <AntdTextArea
            autoSize
            ref={ref}
            size='large'
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            placeholder="answer"
            className={classNames(
              "min-w-[430px]",
              error &&
                "border-red-700 border-2 placeholder:text-red-700"
            )}
          />
        )}
      />
      <button className='text-2xl' type="submit">
        <FaCircleCheck />
      </button>
    </div>
  );
}
