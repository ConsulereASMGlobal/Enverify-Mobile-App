import * as React from 'react';
import { ColorValue } from 'react-native';
import Svg, { Path, Ellipse, Mask, G, SvgProps } from 'react-native-svg';
interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const SvgComponent = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={266}
    height={242}
    fill="none"
    {...props}>
    <Path
      fill={props.color ?? '#F4CF92'}
      d="M127.881 24.842c-29.233 0-37.83-10.286-49.293-16.242C72.86 5.625 51.067-7.452 31.014 5.893 5.794 22.677 20.122 73.028 27 92.519c8.598 24.364-12.035 74.715-15.476 97.996-5.693 38.521 36.11 37.357 72.222 40.064 40.604 3.044 151.692 15.01 164.503-10.828 21.208-42.771-14.329-77.119-14.329-98.537 0-23.28 21.781-81.754-10.318-101.786-29.277-18.272-61.666 5.414-95.721 5.414Z"
      opacity={0.3}
    />
    <Ellipse
      cx={133}
      cy={232}
      fill={props.color ?? '#F4CF92'}
      rx={133}
      ry={10}
    />
    <Mask
      id="a"
      width={102}
      height={59}
      x={151}
      y={170}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance'
      }}>
      <Path fill="#fff" d="M253 170.418H151.031v58.092H253v-58.092Z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#CE763A"
        d="M169.244 194.594s-12.37-6.113-11.795-7.355c.581-1.241 32.664 1.785 32.664 1.785l-20.869 5.57Z"
      />
      <Path
        fill="#EFBF7F"
        d="M156.277 230.365c12.091 3.193 47.104-.328 48.007-.479.898-.156 3.989-34.631 3.301-35.545-.694-.914-15.778-5.801-17.391-5.849-1.613-.043-35.158 2.263-35.9 3.139-.747.871 1.983 38.734 1.983 38.734Z"
      />
      <Path
        fill="#E0A55F"
        d="M190.403 228.73s-3.026-23.734-.048-40.222a1.04 1.04 0 0 0-.167-.016c-1.612-.043-35.158 2.263-35.9 3.139-.741.877 1.989 38.734 1.989 38.734 12.091 3.193 47.104-.328 48.007-.479.011 0 .021-.011.032-.021l-13.913-1.135Z"
      />
      <Path
        fill="#EAAD6A"
        d="M185.71 198.835a46.727 46.727 0 0 0 1.586-10.203c-8.488.51-32.379 2.263-33.002 2.999-.554.656.838 22.101 1.57 32.793.01.006.021.006.032.011 11.784 3.182 25.132-8.279 29.814-25.6Z"
      />
      <Path
        fill="#CE763A"
        d="M190.188 188.492c-8.757 14.681-17.143 24.482-17.143 24.482l-18.757-21.343 18.832 23.015c4.704-5.097 10.843-15.467 17.068-26.154Z"
      />
      <Path
        fill="#CE763A"
        d="M157.315 229.494c5-8.22 15.73-16.52 15.73-16.52l16.885 15.622-16.81-13.95c-4.526 2.811-9.913 8.101-15.805 14.848Z"
      />
      <Path
        fill="#E0A55F"
        d="M191.269 227.677c5.36-8.209 10.461-20.246 10.461-20.246l-10.375-17.832s10.746 17.364 10.994 17.015c.247-.349 4.972-11.563 4.972-11.563l-4.273 12.3 1.214 21.046-2.091-19.514c-1.919 5.01-6.37 11.87-10.902 18.794Z"
      />
    </G>
    <Mask
      id="b"
      width={102}
      height={59}
      x={151}
      y={170}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance'
      }}>
      <Path fill="#fff" d="M253 170.418H151.031v58.092H253v-58.092Z" />
    </Mask>
    <G mask="url(#b)">
      <Path
        fill="#755B44"
        d="M223.685 201.797a.676.676 0 0 1 .624-1.188c.387.135 11.203 3.591 16.88 5.408a.672.672 0 0 1 .436.85.672.672 0 0 1-.85.435c-3.919-1.252-16.724-5.343-16.95-5.43a.514.514 0 0 1-.14-.075ZM200.854 200.238a.677.677 0 0 1 .624-1.188c.387.135 11.203 3.591 16.88 5.408a.67.67 0 0 1 .435.85.671.671 0 0 1-.849.435c-3.919-1.252-16.724-5.344-16.95-5.43a.514.514 0 0 1-.14-.075Z"
      />
      <Path
        fill="#755B44"
        d="M215.138 206.297a.674.674 0 0 1-.097-1.333c.398-.086 11.418-2.833 17.203-4.28a.67.67 0 0 1 .817.495.674.674 0 0 1-.489.817c-3.995.995-17.036 4.247-17.273 4.29-.054.011-.107.016-.161.011ZM215.493 229.848a.679.679 0 0 0 .457-.698.678.678 0 0 0-.726-.613c-.409.021-11.445-.076-17.439.123-.377.017-1.06.796-1.049 1.167a.679.679 0 0 0 .699.656c4.139-.135 17.654-.575 17.891-.597a.494.494 0 0 0 .167-.038ZM227.217 207.178a.672.672 0 0 1-.623-.548.668.668 0 0 1 .527-.785c.397-.086 11.418-2.833 17.202-4.279a.67.67 0 0 1 .817.495.674.674 0 0 1-.489.817c-3.994.994-17.036 4.247-17.272 4.29a.553.553 0 0 1-.162.01Z"
      />
      <Path
        fill="#634B39"
        d="M216.417 202.545a.846.846 0 0 1-.376-.049.657.657 0 0 1-.366-.328c-.161.264-.553.371-.887.237-7.171-2.935-10.38-8.5-9.241-11.972.597-1.812 2.306-2.737 4.564-2.468 3.027.355 5.505 1.731 6.978 3.876 1.93 2.806 1.876 6.494-.156 10.392-.091.172-.29.29-.516.312Zm-7.397-13.472c-1.08.112-1.828.693-2.156 1.693-.833 2.543 1.291 7.671 8.489 10.617.166.07.29.188.355.323 1.838-3.548 1.913-6.86.215-9.333-1.248-1.811-3.36-2.983-5.946-3.284a4.073 4.073 0 0 0-.957-.016Z"
      />
      <Path
        fill="#634B39"
        d="M217.89 202.464c-.043.005-.086.005-.129.005-.376-.021-.672-.29-.661-.607.151-4.247 3.774-9.892 7.752-12.085 1.683-.93 3.333-1.183 4.763-.731.941.295 1.253.844 1.349 1.252.731 3.07-9.295 10.322-11.31 11.746-.28.199-.71.162-.963-.08a.506.506 0 0 1 .059-.801c4.441-3.134 11.322-8.806 10.876-10.682-.033-.129-.108-.263-.452-.371-1.269-.398-2.634.118-3.548.624-3.682 2.026-7.032 7.262-7.171 11.198 0 .279-.248.5-.565.532Z"
      />
      <Path
        fill="#E5CFB1"
        d="M193.452 228.354c35.179 9.666 57.279.946 57.279.946l-1.284-1.629 1.408-3.37-1.435-1.984 1.559-8.886-2.027-3.747 2.107-6.441s-26.503-1.559-30.975-1.817c-4.473-.258-29.428-1.731-29.428-1.731l1.661 4.07-.871 3.059 2.898 3.623-2.166 1.602 3.687 4.881-1.365 5.618 1.172 3.521-2.22 2.285Z"
      />
      <Path
        fill="#D6BA99"
        d="m249.441 227.671 1.409-3.37-1.436-1.984 1.559-8.886-2.026-3.747 2.107-6.441-22.573-1.328-1.715 4.398 1.978 4.295-2.311 9.838 1.456 2.371-1.784 3.677 1.317 1.984s-11.128 3.343-28.498 1.241c31.981 7.382 51.813-.424 51.813-.424l-1.296-1.624Z"
      />
      <Path
        fill="#BC9E80"
        d="m250.946 213.565.022-.14-2.027-3.747.393-1.193-17.547 2.258 19.159 2.822ZM250.608 229.144l-1.167-1.473.903-2.172-13.079 1.683 13.343 1.962ZM226.691 219.301l-.269 1.145 1.419 2.312 13.789-1.511-14.939-1.946Z"
      />
      <Path
        fill="#D6BA99"
        d="m221.223 223.94-26.729-1.462-.01.065 1.172 3.521-2.006 2.08 27.573-4.204ZM201.741 210.705l-10.139-3.672 2.726 3.409-.968.72 8.381-.457ZM191.833 202.609l.468 1.156-.677 2.387 21.675-.178-21.466-3.365ZM194.79 221.263l8.725-5.499-7.854.908.188.253-1.059 4.338ZM229.513 211.216l-14.735-.522 16.079-1.817-1.344 2.339Z"
      />
      <Path
        fill="#755B44"
        d="M229.642 233.934a.654.654 0 0 1-.382-.15.7.7 0 0 1-.102-.968c5.65-7.15 14.488-30.497 14.579-30.728a.672.672 0 0 1 .871-.398c.35.134.522.532.387.887-.365.967-9.004 23.783-14.783 31.099a.687.687 0 0 1-.57.258Z"
      />
      <Path
        fill="#755B44"
        d="M245.189 232.483a.676.676 0 0 1-.597-.473c-.08-.258-8.408-25.805-12.638-30.143a.731.731 0 0 1-.006-1 .656.656 0 0 1 .957-.011c4.462 4.575 12.628 29.632 12.972 30.697.118.371-.07.774-.425.897a.772.772 0 0 1-.263.033ZM197.199 230.472a.634.634 0 0 1-.226-.054.68.68 0 0 1-.339-.892c2.398-5.575 25.82-27.901 26.836-28.874a.686.686 0 0 1 .979.016.709.709 0 0 1-.043.989c-.248.237-24.267 23.09-26.557 28.407a.673.673 0 0 1-.65.408Z"
      />
      <Path
        fill="#755B44"
        d="M221.342 234.192a.634.634 0 0 1-.457-.231c-.726-.855-17.87-21.057-20.294-34.201a.71.71 0 0 1 .537-.823.661.661 0 0 1 .791.532c2.36 12.784 19.815 33.358 19.992 33.562a.706.706 0 0 1-.075.978.659.659 0 0 1-.494.183Z"
      />
    </G>
    <Path
      fill="#564730"
      d="M129.189 218.398H18.618a2.331 2.331 0 0 0-2.333 2.333v5.451a2.331 2.331 0 0 0 2.333 2.333h110.571a2.331 2.331 0 0 0 2.333-2.333v-5.451a2.331 2.331 0 0 0-2.333-2.333Z"
    />
    <Path
      fill="#3F3227"
      d="M123.409 210.388H73.312v18.127h50.097v-18.127ZM44.906 210.388H26.714v18.127h18.192v-18.127Z"
    />
    <Path
      fill="#FFC05A"
      d="M120.044 73.465H32.031v150.19h105.646c0-30.749-9.515-150.19-17.633-150.19Z"
    />
    <Path
      fill="#629799"
      d="M39.025 73.465H13v150.19h43.657c0-30.749-9.515-150.19-17.632-150.19Z"
    />
    <Path
      fill="#448385"
      d="M48.535 179.487c2.908 15.284 4.478 30.304 4.849 44.174h3.273c0-30.75-9.515-150.191-17.632-150.191H13v35.233c13.139 3.28 27.702 29.643 35.535 70.784Z"
    />
    <Path
      fill="#48AEB1"
      d="M120.044 73.465h-81.02c8.118 0 17.633 119.441 17.633 150.19h81.02c0-30.749-9.515-150.19-17.633-150.19Z"
    />
    <Path
      fill="#6CD0D3"
      d="M75.672 135.282c-7.94 5.22-15.886 9.708-23.665 13.434 1.597 17.386 2.893 34.991 3.704 49.415a206.265 206.265 0 0 1 8.634-4.645c26.04-13.23 51.571-19.358 70.875-18.332-2.285-30.798-5.902-66.757-9.735-86.6-11.338 16.128-28.66 32.81-49.813 46.728Z"
    />
    <Path
      fill="#FFE1A4"
      d="M118.786 108.537c-1-7.188-2.021-13.854-3.059-19.816H56.399c1.156 5.634 2.296 12.338 3.409 19.816h58.978Z"
    />
    <Path
      fill="#6D5941"
      d="M116.668 106.628c-.93-5.806-1.881-11.187-2.849-16.004H58.517c1.076 4.548 2.14 9.967 3.178 16.004h54.973Z"
    />
    <Path
      fill="#564730"
      d="m113.819 90.63-55.307-.006c1.075 4.548 2.14 9.967 3.177 16.004h41.588l4.451-11.192 6.091-4.806Z"
    />
    <Path
      fill="#3F3327"
      d="M109.696 106.628a293.914 293.914 0 0 0-2-11.225H60.662c.753 3.188 1.5 6.989 2.231 11.225h46.803Z"
    />
    <Path
      fill="#156467"
      d="M134.828 216.833H58.12v-.473c0-25.212-6.881-115.693-13.838-136.37l-.22-.644h76.767l.102.3c6.983 20.757 13.891 111.453 13.891 136.714v.473h.006Zm-75.891-.951H134c-.086-25.729-6.854-114.479-13.735-135.59H45.26c6.866 21.794 13.596 109.947 13.677 135.59ZM51.75 217.307H15.047V79.303h21.8c3.22 0 6.639 19.66 10.154 58.43 2.661 29.352 4.747 64.096 4.747 79.1v.474Zm-35.88-.952h35.057c-.043-15.224-2.108-49.506-4.742-78.525-3.849-42.453-7.349-57.581-9.338-57.581H15.871v136.106Z"
    />
    <Path
      fill="#156467"
      d="M42.82 178.966H18.322v-34.685h22.401l2.097 34.685Zm-23.675-.823h22.804l-1.994-33.04H19.15v33.04h-.005Z"
    />
    <Path
      fill="#FFF1D9"
      d="m74.22 140.684.506 3.823h-3.839l-1.612-12.268h7.655c.914 0 1.623.629 1.741 1.527l.71 5.381c.118.892-.43 1.543-1.338 1.543H74.22v-.006Zm-.403-3.064h1.527l-.301-2.295h-1.527l.301 2.295ZM86.918 132.239l3.129 10.741.199 1.527h-3.839l-.553-2.473H84.17l.08 2.473h-3.816l-.2-1.527.302-10.741h6.381Zm-1.742 6.725-.828-3.645h-.419l.13 3.645h1.117ZM94.638 140.684l.505 3.823h-3.838l-1.613-12.268h7.655c.914 0 1.624.629 1.742 1.527l.71 5.381c.118.892-.43 1.543-1.339 1.543h-3.822v-.006Zm-.403-3.064h1.521l-.301-2.295h-1.527l.307 2.295ZM101.734 144.507l-1.613-12.268h8.198l.199 1.527-.408 1.559h-3.769l.178 1.365h3.768l.403 3.064h-3.768l.22 1.683h4.382l.403 3.064h-8.193v.006ZM117.044 132.239c.893 0 1.608.629 1.726 1.527l.634 4.816c.076.581-.274 1.226-.833 1.387l1.608 3.016.198 1.527h-3.747l-1.537-3.822h-.769l.506 3.822h-3.839l-1.613-12.268h7.666v-.005Zm-3.429 3.086.301 2.295h1.521l-.301-2.295h-1.521ZM92.37 164.349l3.026-5.704a.653.653 0 0 1 .597-.349.8.8 0 0 1 .666.349l3.978 5.398 2.382-2.489-3.548-4.817c-.925-1.253-2.36-2.005-3.85-2.005-1.483 0-2.768.747-3.434 2.005l-2.538 4.784 2.72 2.828ZM109.545 170.413l-3.951-5.36-2.769 1.962 3.909 5.306c.241.323.166.619.102.758a.634.634 0 0 1-.613.387H99.74l.639 3.559h6.204c1.57 0 2.93-.855 3.543-2.231.623-1.376.398-3.053-.581-4.381ZM95.552 173.466h-6.656a.804.804 0 0 1-.693-.387c-.097-.145-.226-.435-.054-.758l2.613-4.929-3.005-2.285-2.812 5.306c-.704 1.328-.58 3.005.317 4.381.898 1.376 2.436 2.231 4.005 2.231h7.559l-1.274-3.559Z"
    />
    <Path
      fill="#FFF1D9"
      d="m102.605 163.876.081 5.876 5.752-4.204-5.833-1.672ZM90.041 165.268l5.468-1.731-6.661-4.139 1.194 5.87ZM98.68 175.359l-4.934-3.763.736 7.483 4.198-3.72Z"
    />
    <Path
      fill="#68321F"
      d="m155.455 50.977-6.752-1.037s-6.462 7.386 2.365 14.66l5.828-3.231-1.441-10.392Z"
    />
    <Path
      fill="#476C8F"
      d="M124.796 128.121s-.935-8.021-1.489-8.908c-.548-.892-1.623-.973-3.005-.075-1.096.715-.666 6.429-.72 10.816-.011 1.102 1.29 1.694 2.113.957l3.101-2.79Z"
    />
    <Path
      fill="#413949"
      d="M136.129 124.67c-1.79 49.791 15.864 99.141 15.864 99.141l1.037-.08 7.279-77.434 3.285-22.283-27.465.656Z"
    />
    <Path
      fill="#37313F"
      d="M136.129 124.67c-.258 7.23-.108 14.45.338 21.514l17.66-.806s-4.994 59.876-1.731 78.401l.634-.048 7.279-77.434 3.285-22.283-27.465.656Z"
    />
    <Path
      fill="#413949"
      d="m182.63 123.616-31.357-2.865c-.248 9.499 1.768 27.75 1.768 27.75l2.812 2.016 13.843 74.015h1.134s12.354-88.267 11.8-100.916Z"
    />
    <Path
      fill="#37313F"
      d="m182.63 123.616-31.357-2.865c-.183 6.983-2.791 19.106-2.226 24.82 7.101-.263 23.546 1.194 23.546 1.194l-2.376 77.767h.608c.005 0 12.359-88.267 11.805-100.916Z"
    />
    <Path
      fill="#D95252"
      d="M137.043 138.76c11.085 4.231 27.32 1.408 45.017 2.306 0 0 5.311-56.946 1.156-60.554-4.156-3.607-19.853-6.725-24.777-6.397-4.925.328-18.972 6.725-20.972 8.526-1.999 1.812-.424 56.119-.424 56.119Z"
    />
    <Path
      fill="#C54B4B"
      d="M167.094 83.738c6.187 0 11.988-.382 17.02-1.048-.231-1.097-.527-1.85-.898-2.172-4.156-3.608-19.853-6.725-24.777-6.397-3.801.252-13.015 4.112-17.956 6.692 6.365 1.79 15.924 2.925 26.611 2.925Z"
    />
    <Path
      fill="#D95252"
      d="M183.818 81.582c-1.387 10.36-11.386 18.391-23.53 18.391-11.349 0-20.832-7.02-23.154-16.391-1.473 7.473-.086 55.178-.086 55.178 11.085 4.231 27.32 1.408 45.018 2.306-.006.005 4.736-50.85 1.752-59.484Z"
    />
    <Path
      fill="#FFCF6E"
      d="M163.207 140.76c-3.005-20.047 2-58.178 11.391-64.64l8.774 3.387s3.08 62.027 1.537 63.258c-1.537 1.231-21.24 1.075-21.702-2.005Z"
    />
    <Path
      fill="#F9B050"
      d="M172.83 94.592c-2.333 0-4.597-.145-6.763-.42-3.489 14.51-4.736 34.078-2.86 46.593.462 3.08 20.159 3.231 21.702 2 1.07-.855-.086-31.008-.897-49.367-3.414.764-7.199 1.194-11.182 1.194ZM169.416 83.641c5.258-.344 10.058-1.177 14.042-2.376l-.086-1.758-8.774-3.387c-1.919 1.323-3.661 3.973-5.182 7.521Z"
    />
    <Path
      fill="#D95252"
      d="M179.367 119.831c-5.387-14.315-.463-40.168 2-40.63 2.462-.463 7.08 3.23 12.31 11.235 5.231 8.005 7.188 38.997.726 43.561-5.231 3.693-15.036-14.166-15.036-14.166Z"
    />
    <Path
      fill="#C54B4B"
      d="M193.683 90.436c-.28-.425-.554-.828-.823-1.23.038.22.081.445.113.671 1.661 10.322-.602 19.251-5.053 19.939-4.064.629-8.548-5.822-10.564-14.8-.785 8.172-.607 17.854 2.011 24.81 0 0 9.805 17.859 15.036 14.16 6.467-4.553 4.51-35.55-.72-43.55Z"
    />
    <Path
      fill="#D95252"
      d="M139.929 118.987c4.398-13.133.377-36.851-1.634-37.276-2.01-.424-5.779 2.968-10.047 10.306-4.269 7.343-5.865 35.776-.592 39.959 4.274 3.392 12.273-12.989 12.273-12.989Z"
    />
    <Path
      fill="#FFCF6E"
      d="M144.666 140.378c2.951-4.102 3.924-64.102 3.924-64.102s-10.58 3.516-12.085 6.408c-3.43 6.586-3.247 58.151-2.575 58.92.672.774 9.623.317 10.736-1.226Z"
    />
    <Path
      fill="#F9B050"
      d="M135.489 137.47c3.865 0 7.284 1.021 9.354 2.585.812-1.79 1.468-7.87 1.989-15.606-1.65-3.591-4.177-5.886-7.015-5.886-2.436 0-4.645 1.699-6.269 4.446-.043 5.918 0 11.144.102 14.541.597-.053 1.21-.08 1.839-.08Z"
    />
    <Path
      fill="#FFA77B"
      d="M158.439 74.12c-1.683.108-4.731.656-8.043 2.307 1.742 8.72 5 12.235 5 12.235s10.977-7.15 16.332-12.789c-5.252-1.199-10.731-1.914-13.289-1.752Z"
    />
    <Path
      fill="#EA875C"
      d="M158.439 74.12c-1.683.108-4.731.656-8.043 2.307.538 2.688 1.215 4.876 1.903 6.623 2.661.44 5.597.688 8.677.688.5 0 .995-.01 1.484-.022 3.209-2.381 6.822-5.268 9.268-7.843-5.252-1.199-10.731-1.914-13.289-1.752Z"
    />
    <Path
      fill="#476C8F"
      d="M129.979 137.647c-2.812.043-9.682-3.22-10.392-5.526-.709-2.307.608-7.129 3.059-7.629s8.558 1.414 10.327 3.005c1.769 1.597 2.118 10.069-2.994 10.15Z"
    />
    <Path
      fill="#3C5A77"
      d="M132.973 127.497c-1.344-1.209-5.171-2.596-8.015-2.978.053.043-1.231.35-1.183.393 1.753 1.575.694 7.908-1.489 9.88 2.446 1.559 5.897 2.887 7.693 2.86 5.112-.086 4.763-8.558 2.994-10.155ZM163.293 138.169c-4.193.086-16.708-1.038-17.488-1.93-.779-.893-.72-3.624-.005-3.801.72-.183 9.983.892 12.832-.215 2.849-1.108 6.677-.645 6.677-.645l-2.016 6.591Z"
    />
    <Path
      fill="#FFECC5"
      d="M122.27 131.373c19.084 4.774 49.404 1.538 49.404 1.538l3.849-41.25s-18.315-2.305-23.084-2.155c-4.774.156-34.169 1.694-34.169 1.694s4 14.622 4 21.24v18.933Z"
    />
    <Path
      fill="#F4DCB3"
      d="M122.27 117.52v4.36c13.488-.043 34.744 1.069 34.744 1.069v-6.004s-14.278 2.666-34.744.575ZM174.437 103.268c-4.757-1.989-19.971-3.445-38.007-3.445-5.682 0-11.08.145-15.967.403.635 2.919 1.242 6.101 1.565 8.811 4.462.209 9.316.328 14.396.328 17.725 0 32.723-1.409 37.755-3.344l.258-2.753Z"
    />
    <Path
      fill="#D3B998"
      d="m154.934 102.978-24.815-1.269 28.626-2.311-3.811 3.58Z"
    />
    <Path
      fill="#F4DCB3"
      d="m156.552 96.054-24.815-1.269 28.626-2.311-3.811 3.58Z"
    />
    <Path
      fill="#E5CEAC"
      d="m159.783 113.827-24.815-1.269 28.626-2.306-3.811 3.575Z"
    />
    <Path
      fill="#D3B998"
      d="m155.251 126.874-10.01-1.011 11.547-1.833-1.537 2.844Z"
    />
    <Path
      fill="#E5CEAC"
      d="M152.434 89.512c-.108.005-.231.005-.36.01l.209 42.927s-17.401-.291-28.019-.619c19.128 4.091 47.41 1.081 47.41 1.081l3.849-41.25c0 .006-18.315-2.305-23.089-2.15Z"
    />
    <Path
      fill="#D3B998"
      d="M172.824 120.595c-7.381.591-14.783.742-20.595.731l.006 1.215c8.94-.769 15.633-.855 20.471-.672l.118-1.274ZM152.197 115.047a95.768 95.768 0 0 1 21.057.941l.135-1.436-21.197-.865.005 1.36ZM152.16 107.596l.005.952 21.659 1.279.113-1.21c-5.768-.225-13.138-.559-21.777-1.021ZM162.057 100.129c4.435 0 8.682.269 12.606.758l.86-9.22s-18.315-2.306-23.084-2.155c-.107.005-.231.005-.36.01l.054 11.069c3.15-.295 6.478-.462 9.924-.462ZM162.057 123.987c-3.403 0-6.693-.161-9.817-.452l.043 8.919s-17.401-.29-28.019-.618c19.128 4.091 47.41 1.08 47.41 1.08l.882-9.445c-3.323.333-6.849.516-10.499.516Z"
    />
    <Path
      fill="#413949"
      d="M199.301 127.266c-.081-6.349-5.769-12.214-12.709-13.106-6.94-.887-12.499 3.537-12.418 9.886.08 6.349 5.768 12.214 12.708 13.106 6.941.893 12.499-3.537 12.419-9.886Z"
    />
    <Path
      fill="#EA875C"
      d="M166.217 127.465c6.156-6.005 13.161-11.235 16.547-11.698 3.387-.462 11.392 4.156 12.623 8.005 1.231 3.849.618 8.467-1.075 10.467-1.694 2-27.627 3.155-27.627 3.155l-.468-9.929Z"
    />
    <Path
      fill="#DD704A"
      d="M195.382 123.772c-.468-1.457-1.904-3.027-3.694-4.387.344.549.533 1.124.533 1.715 0 3.887-7.957 7.043-17.778 7.043-2.925 0-5.688-.28-8.123-.78-.038.032-.07.07-.108.102l.462 9.929s25.934-1.155 27.627-3.155c1.699-2 2.312-6.618 1.081-10.467Z"
    />
    <Path
      fill="#3C5A77"
      d="M171.905 139.222c9.236-10.273-1.962-17.197-1.962-17.197l-9.064 7.445-1.849 8.424 12.875 1.328Z"
    />
    <Path
      fill="#476C8F"
      d="M119.84 130.4c.36-2.403 2.903-8.214 4.048-8.338 1.145-.123 2.312.758 2.457 1.393.145.634-2.221 8.15-2.624 8.719-.403.56-3.956-1.279-3.881-1.774Z"
    />
    <Path
      fill="#3C5A77"
      d="M124.318 132.959c.581-2.473 3.645-8.461 4.801-8.59 1.15-.129 2.241.779 2.327 1.43.086.65-2.956 8.391-3.408 8.977-.451.592-3.838-1.306-3.72-1.817ZM132.618 136.534c1.565-1.602 4.387-6.827 3.817-7.816-.57-.989-1.897-1.452-2.451-1.221-.549.232-4.736 6.242-4.925 6.876-.182.629 3.237 2.489 3.559 2.161Z"
    />
    <Path
      fill="#476C8F"
      d="M163.497 127.6c-6.386 2.704-12.332-.479-13.568.424-1.231.909-1.758 2.532-1.495 3.054.264.521 6.123 1.779 8.155 3.069 2.032 1.291 2.688 3.059 2.688 3.059l7-3.854-2.78-5.752Z"
    />
    <Path
      fill="#F9B050"
      d="M148.466 82.281c.081-3.715.119-6.01.119-6.01s-5.634 1.87-9.268 4.01c2.655.855 5.752 1.532 9.149 2Z"
    />
    <Path
      fill="#DD704A"
      d="M169.287 75.352c-2.306-8.774-1.425-17.74-1.425-17.74l-16.853 1.268 1.425 16.697s.537 4.543 5.386 4.543c4.849.005 11.467-4.768 11.467-4.768Z"
    />
    <Path
      fill="#7C4127"
      d="M168.056 68.81c1.306-5.156 3.08-11.236 2.769-13.855-.307-2.617-14.542-6.08-19.085-5.31-4.542.768-2.618 6.542-2.618 6.542 7.526 3.833 14.859 7.72 18.934 12.622Z"
    />
    <Path
      fill="#68321F"
      d="M153.536 58.471c2.65-.08 6.069.565 9.606 1.946 2.393.936 4.522 2.092 6.231 3.317.914-3.607 1.667-6.994 1.457-8.773-.306-2.618-14.542-6.08-19.084-5.311-4.543.768-2.618 6.542-2.618 6.542a261.55 261.55 0 0 1 4.408 2.28Z"
    />
    <Path
      fill="#FFA77B"
      d="M150.052 74.583c1.016.51 11.236 1.075 12.236.387 1-.694 3.618-8.542 3.618-10.236 0-1.693-3.005-10.316-3.387-10.617-3.387-2.693-12.467-1.306-13.391-.769-.925.532.612 21.079.924 21.235Z"
    />
    <Path
      fill="#EA875C"
      d="M155.552 58.348c3.435 0 6.634.806 9.327 2.198-.909-2.93-2.129-6.246-2.366-6.43-3.386-2.692-12.466-1.305-13.391-.768-.317.188-.344 2.769-.226 6.07a20.81 20.81 0 0 1 6.656-1.07Z"
    />
    <Path
      fill="#FFA77B"
      d="M168.991 61.423c-1.306-2.156-3.628-.769-4.316 2.849l.462 3c-.005 0 5.161-3.694 3.854-5.85Z"
    />
    <Path
      fill="#CC4F46"
      d="M168.266 62.132c-.613-1.01-1.661-.494-2.102 1.022.301-.027.596.129.833.516.161.263.129.575-.011.892.726-.645 1.72-1.704 1.28-2.43Z"
    />
    <Path
      fill="#FFCF6E"
      d="M151.896 50.112c0-2.484 1.887-7.327 3.038-7.967 1.155-.635 11.601.924 14.891 2.537 3.29 1.618 1.096 11.311 1.096 11.311-5.096-1.57-11.058-5.134-19.025-5.881Z"
    />
    <Path
      fill="#F9B050"
      d="M169.825 44.688c-1.339-.656-3.86-1.307-6.457-1.801.172 1.215.264 2.489.264 3.8 0 2.21-.258 4.312-.721 6.226 2.952 1.134 5.58 2.338 8.016 3.09-.006-.005 2.188-9.703-1.102-11.315Z"
    />
    <Path
      fill="#D95252"
      d="M147.047 45.725c-4.924.032-6.182 4.785-.177 7.747 2.252-1.903 13.031-2.032 17.934.215-3.903-3.881-9.387-8.02-17.757-7.962Z"
    />
    <Path
      fill="#4E4631"
      d="M167.061 228.51h7.204c.436-2.398-2.758-2.113-2.924-5.752-.097-2.097-2.893-2.597-2.242 0 .882 3.499-2.247 3.639-2.038 5.752ZM153.627 228.51h-11.682c1.484-3.376 6.005-1.328 7.817-3.21 1.699-1.768 1.677-4.139 1.677-4.139l2.28.995-.092 6.354Z"
    />
    <Path fill="#E5CEAC" d="M122.27 113.655v2.107l18.67-1.328-18.67-.779Z" />
    <Path
      fill="#F4DCB3"
      d="M119.582 96.382c.124.527.258 1.08.387 1.65L134.473 97l-14.891-.618Z"
    />
    <Path
      fill="#3C5A77"
      d="M163.497 127.6c-2.301.973-4.542 1.182-6.526 1.096.177.21.28.43.28.656 0 1.247-2.785 2.29-6.581 2.613 1.957.607 4.672 1.392 5.925 2.188 2.032 1.29 2.688 3.059 2.688 3.059l6.999-3.855-2.785-5.757Z"
    />
    <Path
      fill="#37313F"
      d="m155.283 153.538-7.505-5.542 6.699 1.155 10.848-.924-10.042 5.311Z"
    />
    <Path
      fill="#68321F"
      d="m156.853 55.456 4.397.854c.371.07.618.447.548.839l-.247 1.484c-.064.392-.419.655-.79.58l-4.398-.855c-.37-.07-.618-.446-.548-.843l.247-1.484a.683.683 0 0 1 .791-.575ZM148.047 56.364l4.43-.57c.371-.048.715.237.768.63l.194 1.494c.054.398-.21.758-.581.806l-4.429.57c-.371.048-.715-.237-.769-.63l-.194-1.494c-.053-.397.21-.758.581-.806Z"
    />
    <Path
      fill="#DD704A"
      d="M154.826 59.143c-1.193 3.694-.543 6.86-.543 6.86s1.607.339 2.36.054l.016.07-3.473.672c.006.005-.252-3.393 1.64-7.656ZM158.428 67.148l.215.898c-.124.064-3.091 1.623-7.284 1.005l.263-.43c3.844.565 6.779-1.457 6.806-1.473Z"
    />
    <Path
      fill="#D27558"
      d="M154.251 73.12c.118.038.199-.446.183-1.085-.017-.64-.129-1.188-.248-1.226-.118-.038-.199.446-.182 1.086.021.634.129 1.183.247 1.226Z"
    />
    <Path
      fill="#3F3434"
      d="m157.202 59.794 2.409.51c.005.076.01.146.01.216.011 1.446-.537 2.65-1.225 2.688-.689.037-1.253-1.102-1.264-2.549a5.7 5.7 0 0 1 .07-.865ZM152.6 59.853l-1.93.253c-.01.07-.026.14-.032.215-.166 1.446.129 2.704.656 2.817.532.113 1.097-.968 1.263-2.409.038-.3.049-.596.043-.876Z"
    />
  </Svg>
);
export default SvgComponent;
